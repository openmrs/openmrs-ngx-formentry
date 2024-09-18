import { Injectable } from '@angular/core';
import { ValueAdapter } from './value.adapter';
import { Form } from '../form-factory';
import { GroupNode, LeafNode } from '../form-factory/form-node';
import moment from 'moment';
import { AppointmentResponsePayload } from './appointment-helper';

interface AppointmentPayload {
  [key: string]: string | { uuid: string }[];
  providers: Array<{ uuid: string }>;
  locationUuid: string;
  serviceUuid: string;
  endDateTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentAdapter implements ValueAdapter {
  public generateFormPayload(form: Form): AppointmentPayload {
    const uuid = form?.valueProcessingInfo?.appointmentUuid;

    const questionNodes = this.findAppointmentQuestionNodes(form.rootNode);
    const payload = this.generateFormPayloadForQuestion(questionNodes);
    const appointmentPayload = uuid ? { ...payload, uuid } : payload;
    return appointmentPayload;
  }

  public populateForm(form: Form, payload: AppointmentResponsePayload): void {
    const questionNodes = this.findAppointmentQuestionNodes(form.rootNode);
    this.populateFormForQuestion(questionNodes, payload);
  }

  private populateFormForQuestion(
    appointmentQuestionNodes: LeafNode[],
    payload: AppointmentResponsePayload
  ): void {
    appointmentQuestionNodes.forEach((node) => {
      const appointmentKey =
        node.question.extras.questionOptions.appointmentKey;
      const value = payload[appointmentKey];

      if (appointmentKey) {
        if (appointmentKey === 'duration') {
          node.control.setValue(this.calculateDuration(payload));
          return;
        }

        if (value instanceof Object) {
          if (Array.isArray(value)) {
            node.control.setValue(value[0].uuid);
            return;
          }
          node.control.setValue(value.uuid);
          return;
        }

        node.control.setValue(value);
      }
    });
  }

  private calculateDuration(payload: AppointmentResponsePayload): string {
    const duration = moment
      .duration(moment(payload.endDateTime).diff(payload.startDateTime))
      .asMinutes();
    return duration.toString();
  }

  private findAppointmentQuestionNodes(formNode: GroupNode): LeafNode[] {
    const appointmentNodes: LeafNode[] = [];

    const traverseNode = (node: GroupNode | LeafNode): void => {
      if (node instanceof GroupNode) {
        Object.values(node.children).forEach(traverseNode);
      } else if (
        node instanceof LeafNode &&
        node.question.extras?.type === 'appointment'
      ) {
        appointmentNodes.push(node as LeafNode);
      }
    };

    traverseNode(formNode);

    return appointmentNodes;
  }

  private generateFormPayloadForQuestion(
    appointmentQuestionNodes: LeafNode[]
  ): AppointmentPayload {
    const formPayload = appointmentQuestionNodes.reduce<Record<string, string>>(
      (payload, node) => {
        const appointmentKey =
          node.question.extras.questionOptions.appointmentKey;
        payload[appointmentKey] = node.control.value;
        return payload;
      },
      {}
    );

    const {
      providers,
      startDateTime,
      duration,
      service,
      location,
      ...restPayload
    } = formPayload;

    return {
      ...restPayload,
      locationUuid: location,
      serviceUuid: service,
      providers: [{ uuid: providers }],
      startDateTime: moment(startDateTime).toISOString(),
      endDateTime: this.calculateEndDateTime(
        startDateTime,
        parseInt(duration, 10)
      )
    };
  }

  private calculateEndDateTime(
    startDatetime: string,
    durationMinutes: number
  ): string {
    return moment(startDatetime).add(durationMinutes, 'minutes').toISOString();
  }
}
