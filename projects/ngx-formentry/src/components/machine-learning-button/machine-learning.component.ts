import { Component, Input, OnInit } from '@angular/core';

import { LeafNode } from '../../form-entry/form-factory/form-node';
import { ObsAdapterHelper } from '../../form-entry/value-adapters/obs-adapter-helper';
import { generatePredictionPayload } from './model-helper';
import { MachineLearningService } from './machine-learning.service';
import * as _ from 'lodash';

interface Payload {
  [key: string]: string;
}

@Component({
  selector: 'machine-learning-risk-score',
  templateUrl: './machine-learning.component.html'
})
export class MachineLearningComponent implements OnInit {
  @Input() node: LeafNode;
  showMachineLearningButton = false;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;

  constructor(
    private obsAdapter: ObsAdapterHelper,
    private machineLearningService: MachineLearningService
  ) {}

  ngOnInit() {
    this.showMachineLearningButton =
      this.node.question.extras?.questionOptions['machineLearning'] || false;
  }

  getRiskScore() {
    this.announceRequiredFields();
    if (this.node.form.valid) {
      this.isLoading = true;
      const { sex, age } = this.node.form.dataSourcesContainer.dataSources[
        'patient'
      ];
      const initialPayload = this.buildInitialPayload();
      const questionConcepts = this.generateKeyValue();
      const objMap = this.buildObjMap(initialPayload, questionConcepts);
      const finalPayload = this.machineLearningService.mapToMLModel(
        objMap,
        age
      );
      const machineLearningScore = generatePredictionPayload(finalPayload, sex);
      const riskPayload = this.buildRiskPayload(machineLearningScore);

      this.machineLearningService.fetchPredictionScore(riskPayload).subscribe(
        (res) => {
          const predictionMessage = this.machineLearningService.predictRisk(
            res
          );
          this.setRiskScore(predictionMessage);
          this.isLoading = false;
        },
        (error) => {
          this.hasError = true;
          this.isLoading = false;
          this.errorMessage =
            error.message ?? 'An error occurred while fetching risk score';
          this.setRiskScore(this.errorMessage);
        }
      );
    }
  }

  private buildInitialPayload(): Payload {
    return this.obsAdapter
      .getObsNodePayload(this.node.form.rootNode)
      .reduce((acc, item) => {
        acc[item.concept] = item['value'];
        return acc;
      }, {});
  }

  private buildObjMap(payload: Payload, questionConcepts: Payload): Payload {
    return Object.entries(questionConcepts)
      .map(([key, value]) => {
        const valueKey = String(value);
        return { key, value: payload[valueKey] ?? '' };
      })
      .reduce((acc, item) => {
        acc[item.key] = this.extractNumbersOrUuid(item['value']);
        return acc;
      }, {});
  }

  private buildRiskPayload(machineLearningScore: any): object {
    const modelConfigs = {
      modelId: 'hts_xgb_1211_jan_2023',
      encounterDate: new Date().toISOString().slice(0, 10),
      facilityId: '',
      debug: 'true'
    };

    return {
      modelConfigs,
      variableValues: machineLearningScore
    };
  }

  private generateKeyValue(): Payload {
    let questionConcepts = {};
    this.node.form.schema.pages.forEach((page) => {
      page.sections.forEach((section) => {
        section.questions.forEach((question) => {
          if (question.questionOptions && question.questionOptions.concept) {
            questionConcepts[question.id] = question.questionOptions.concept;
          }
        });
      });
    });
    return questionConcepts;
  }

  private setRiskScore(score: string) {
    const riskScore = this.node.form.searchNodeByQuestionId('riskScore')[0];
    riskScore.control.setValue(score);
  }

  extractNumbersOrUuid(inputStr) {
    inputStr = String(inputStr); // Convert to string just in case
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (uuidPattern.test(inputStr)) {
      return inputStr;
    } else {
      let numbers = inputStr?.match(/\d+/g) ?? [inputStr];
      return isNaN(parseInt(numbers[0])) ? numbers[0] : parseInt(numbers[0]);
    }
  }

  announceRequiredFields() {
    const requiredFields = [
      'populationType',
      'facilityHTStrategy',
      'facilityHTStrategy',
      'patDepart',
      'patienTyPe',
      'hcwCare',
      'cricChild',
      'testHistory'
    ];

    requiredFields
      .map((field) => this.node.form.searchNodeByQuestionId(field)[0])
      .forEach((node) => {
        node.control.markAsTouched();
      });
    this.node.form.showErrors = true;
  }
}
