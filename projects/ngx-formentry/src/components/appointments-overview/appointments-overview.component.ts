import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})
export class AppointmentsOverviewComponent implements OnInit, OnChanges {
  @Input() node: LeafNode;
  showAppointments = false;
  loadingAppointments = false;
  errorLoadingAppointments = false;
  appointmentsLoaded = false;
  appointments: Array<any> = [];
  today = '';
  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.node.control.valueChanges.subscribe((v) => {
      this.resetProperties();
      const node = this.node;
      if (node.question.extras.questionOptions.concept
        && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
        || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
        // console.log('what change is here', this.showAppointments);
        if (!this.showAppointments) {
          this.loadingAppointments = true;
          this.showAppointments = true;
          let dataSource;
          if (node.form && node.form.dataSourcesContainer.dataSources) {
            dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
          }
          const locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
          if (dataSource && locationUuid) {
            const startDate = moment(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
            const endDate = moment(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
            this.today = moment(v).format('DD-MM-YYYY');
            // create 5 week days
            const _data = [];
            const programTypes = ['781d85b0-1359-11df-a1f1-0026b9348838', '781d897a-1359-11df-a1f1-0026b9348838',
              '96047aaf-7ab3-45e9-be6a-b61810fe617d', 'c19aec66-1a40-4588-9b03-b6be55a8dd1d', 'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
              '334c9e98-173f-4454-a8ce-f80b20b7fdf0', '96ba279b-b23b-4e78-aba9-dcbd46a96b7b', '781d8880-1359-11df-a1f1-0026b9348838'];
            const programTypeParams = programTypes.join();
            for (let i = 1; i <= 5; i++) {
              _data.push({
                date: moment(v).startOf('week').add(i, 'day').format('DD-MM-YYYY'),
                count: 0
              });
            }
            dataSource.getMonthlySchedule({
              startDate: startDate,
              endDate: endDate,
              limit: 5,
              locationUuids: locationUuid,
              programType: programTypeParams
            }).subscribe((data) => {
              this.appointmentsLoaded = true;
              this.loadingAppointments = false;
              _data.map((appointment, index) => {
                appointment.count = data[index] !== undefined ? data[index].count.scheduled : 0;
              });
              this.appointments = _data;
            }, (error) => {
              this.loadingAppointments = false;
              this.errorLoadingAppointments = true;
              this.showAppointments = false;
              console.error(error);
            });
          } else {
            this.showAppointments = false;
            this.errorLoadingAppointments = true;
          }
        }
      }
    });
  }

  resetProperties() {
    this.loadingAppointments = false;
    this.appointmentsLoaded = false;
    this.errorLoadingAppointments = false;
    this.showAppointments = false;
    this.appointments = [];
    this.today = '';
  }
}
