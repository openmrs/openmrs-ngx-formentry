import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class HistoricalEncounterDataService {

  dataSources: any = {};

  constructor() {
  }

  registerEncounters(name: string, encounters: any) {
    let encStore: any = {
      data: [],
      getValue: (key: string, index = 0): any => {
        let pathArray = key.split('.');
        if (pathArray.length > 0) {
          return this.getFirstValue(pathArray, encStore.data[index]);
        }
        return encStore.data[index][key];
      },
      getAllObjects: () => {
        return encStore.data;
      },
      getSingleObject: (index = 0) => {
        return encStore.data[index];
      }
    };

    if (_.isArray(encounters)) {
      let group: Array<any> = [];
      _.each(encounters, (encounter) => {
          group.push(this._transformEncounter(encounter));
      });

      // Sort them in reverse chronological order
      encStore.data = _.sortBy(group, 'encounterDatetime').reverse();
    } else {
      // Assume a single openmrs rest encounter object.
      encStore.data.push(this._transformEncounter(encounters));
    }

    this.putObject(name, encStore);

  }

  putObject(name, object): void {
    this.dataSources[name] = object;
  }

  getObject(name: string): any {
    return this.dataSources[name] || null;
  }

  getFirstValue(path: Array<string>, object: any) {

    let answers = [];

    this.getAllValues(path, object, answers);

    if (answers.length > 0) {
      return answers[0];
    }

  }

  getAllValues(path, object, answers) {
    if (_.isNil(object)) {
      return;
    }

    if (path.length <= 1) {
      if (!_.isNil(object[path[0]])) {
        answers.push(object[path[0]]);
      }
      return;
    }

    let newpath = path.splice(1);
    let key = path[0];

    if (_.isArray(object[key]) && object[key].length > 0) {
      _.each(object[key], (childObject) => {
        this.getAllValues(newpath.slice(0), childObject, answers);
      });
    } else {
      this.getAllValues(newpath.slice(0), object[key], answers);
    }
  }

  private _transformEncounter(encounter: any) {
    if (_.isNil(encounter)) {
      return;
    }
    // Transform encounter Level details to key value pairs.
    let prevEncounter: any = {
      encounterDatetime: encounter.encounterDatetime
    };

    if (encounter.location && encounter.location.uuid) {
      prevEncounter.location = encounter.location.uuid;
    }

    if (encounter.patient && encounter.patient.uuid) {
      prevEncounter.patient = encounter.patient.uuid;
    }

    if (encounter.form && encounter.form.uuid) {
      prevEncounter.form = encounter.form.uuid;
    }

    if (encounter.encounterType && encounter.encounterType.uuid) {
      prevEncounter.encounterType = encounter.encounterType.uuid;
    }

    let provider = encounter.provider;
    let encProvider = encounter.encounterProviders;

    let providerValue = provider ? provider.uuid : encProvider[0].provider.uuid;

    prevEncounter.provider = providerValue;

    // Deal with obs.
    if (encounter.obs) {
      let processedObs: any = this._transformObs(encounter.obs);

      // add in individual processed obs to prevEncounter
      _.extend(prevEncounter, processedObs);
    }

    return prevEncounter;
  }

  private _transformObs(obs: any): any {

    if (!obs) {
      return null;
    }

    let obsRep: any = {};
    if (_.isArray(obs)) {
      _.each(obs, (singleObs) => {
        this._augumentObs(obsRep, this._transformObs(singleObs));
      });
      return obsRep;
    } else if (obs.groupMembers) {
      let group: any = {};
      _.each(obs.groupMembers, (member) => {
        this._augumentObs(group, this._transformObs(member));
      });

      // Handle already existing data
      if (obsRep[obs.concept.uuid] && _.isArray(obsRep[obs.concept.uuid])) {
        obsRep[obs.concept.uuid].push(group);
      } else {
        obsRep[obs.concept.uuid] = [group];
      }
      return obsRep;
    } else {
      if (typeof obs.value === 'object') {
        obsRep[obs.concept.uuid] = obs.value.uuid;
      } else {
        obsRep[obs.concept.uuid] = obs.value;
      }
      return obsRep;
    }

  }

  private _augumentObs(existing: any, toAdd: any): any {
    for (let key in toAdd) {
      if (_.has(existing, key)) {
        // check if not an array yet
        if (!_.isArray(existing[key])) {
          let temp = existing[key];
          existing[key] = [temp];
        }

        // Check whether the incoming is array (for group members)
        if (_.isArray(toAdd[key])) {
          Array.prototype.push.apply(existing[key], toAdd[key]);
        } else {
          existing[key].push(toAdd[key]);
        }
      } else {
        existing[key] = toAdd[key];
      }
    }
    return existing;
  }


}
