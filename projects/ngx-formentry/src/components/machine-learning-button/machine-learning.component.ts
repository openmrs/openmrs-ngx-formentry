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
  selector: 'ofe-machine-learning-risk-score',
  templateUrl: './machine-learning.component.html'
})
export class MachineLearningComponent implements OnInit {
  @Input() node: LeafNode;
  showMachineLearningButton = false;
  isLoading = false;
  hasError = false;
  errorMessage = '';
  riskScoreMessage = '';
  riskScore = '';

  constructor(
    private obsAdapter: ObsAdapterHelper,
    private machineLearningService: MachineLearningService
  ) {}

  ngOnInit() {
    this.showMachineLearningButton =
      this.node.question.extras?.questionOptions?.machineLearning || false;
  }

  getRiskScore() {
    this.announceRequiredFields();
    if (this.hasAllrequiredFields()) {
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
          if (!res) {
            this.isLoading = false;
            this.errorMessage = 'An error occurred while fetching risk score';
            this.setRiskScore(this.errorMessage);
            this.setAutoGenerateRiskScore(0, this.errorMessage);
            return;
          }

          const {
            message,
            riskScore
          } = this.machineLearningService.predictRisk(res);
          this.setRiskScore(message);
          this.setAutoGenerateRiskScore(riskScore, message);
          this.isLoading = false;
          // this.restoreRequiredFields();
        },
        (error) => {
          this.hasError = true;
          this.isLoading = false;
          this.errorMessage =
            error.message ?? 'An error occurred while fetching risk score';
          this.setRiskScore(this.errorMessage);
          // this.restoreRequiredFields();
        }
      );
    } else {
      alert('Please fill all required questions for Risk score to work well!');
    }
  }

  private buildInitialPayload(): Payload {
    return this.obsAdapter
      .getObsNodePayload(this.node.form.rootNode)
      .reduce((acc, item) => {
        acc[item.concept] = item.value;
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
        acc[item.key] = this.extractNumbersOrUuid(item.value);
        return acc;
      }, {});
  }

  private buildRiskPayload(machineLearningScore: any): object {
    const modelConfigs = {
      modelId: 'hts_xgb_01052024_may_2024',
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
    let questionConcepts: Payload = {};
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

  private setRiskScore(scoreMessage: string) {
    const riskScoreMessage = this.node.form.searchNodeByQuestionId(
      'riskScore'
    )[0];
    riskScoreMessage.control.setValue(scoreMessage);
  }

  private extractNumbersOrUuid(inputStr: string) {
    inputStr = String(inputStr); // Convert to string just in case
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (uuidPattern.test(inputStr)) {
      return inputStr;
    } else {
      let numbers = inputStr?.match(/\d+/g) ?? [inputStr];
      return isNaN(parseInt(numbers[0])) ? numbers[0] : parseInt(numbers[0]);
    }
  }

  private announceRequiredFields() {
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
  }

  private hasAllrequiredFields() {
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
    return (
      requiredFields.filter(
        (field) =>
          this.node.form.searchNodeByQuestionId(field)[0]?.control?.valid
      )?.length > 0
    );
  }

  private getRiskLevel = (
    probabilityForPositivity: number,
    message: string
  ) => {
    const highRiskThreshold = 0.1079255;
    const mediumRiskThreshold = 0.02795569;
    const lowRiskThreshold = 0.005011473;

    if (probabilityForPositivity === 0) {
      this.riskScore = 'No risk score available';
      return '';
    }

    if (probabilityForPositivity > highRiskThreshold) {
      this.riskScore = 'Highest Risk Client';
      return '167164AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (
      probabilityForPositivity <= highRiskThreshold &&
      probabilityForPositivity > mediumRiskThreshold
    ) {
      this.riskScore = 'High Risk Client';
      return '166674AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (
      probabilityForPositivity <= mediumRiskThreshold &&
      probabilityForPositivity > lowRiskThreshold
    ) {
      this.riskScore = 'Medium Risk Client';
      return '1499AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (probabilityForPositivity <= lowRiskThreshold) {
      this.riskScore = 'Low Risk Client';
      return '166675AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    }
  };

  // Set the autocalculate risk score
  private setAutoGenerateRiskScore(riskScore: number, message: string) {
    this.riskScoreMessage = message;
    const genRisKQuestion = this.node.form.searchNodeByQuestionId('genRisK');
    const riskLevel = this.getRiskLevel(riskScore, message);
    genRisKQuestion?.[0]?.control?.setValue(riskLevel);
  }
}
