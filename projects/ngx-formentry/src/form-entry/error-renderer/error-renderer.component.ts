import {
    Component, OnInit, Input
} from '@angular/core';
import * as _ from 'lodash';

import { Form } from '../form-factory/form';
import { ValidationFactory } from '../form-factory/validation.factory';
import { NodeBase, LeafNode } from '../form-factory/form-node';
import { QuestionGroup } from '../question-models/group-question';
import { FormErrorsService } from '../services';

@Component({
    selector: 'error-renderer',
    templateUrl: 'error-renderer.component.html',
    styleUrls: ['./error-renderer.component.css']
})
export class ErrorRendererComponent implements OnInit {

  @Input() form: Form;

  constructor(private validationFactory: ValidationFactory, private formErrorsService: FormErrorsService) {}

  ngOnInit() {
  }

  showErrors() {
    return !this.form.valid && this.form.showErrors;
  }

  get errorNodes() {

    const invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
    return invalidControls;
  }

  getControlError(node: LeafNode) {
      const errors: any = node.control.errors;

      if (errors) {

          return this.validationFactory.errors(errors, node.question);
      }

      return [];
  }

  announceErrorField(errorNode: LeafNode) {

    const nodes: Array<NodeBase> = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));

    _.forEach(nodes, (node: NodeBase) => {

      if (node.question.renderingType === 'page') {
        const pageIndex: number = this.getPageIndex(node);
        this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
      }
    });
  }

  getPageIndex(node: NodeBase) {
     const questionGroup: QuestionGroup = this.form.rootNode.question as QuestionGroup;
     return questionGroup.questions.indexOf(node.question);
  }
}
