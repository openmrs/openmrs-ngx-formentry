import { Injectable } from '@angular/core';
import { ValueAdapter } from './value.adapter';
import { Form } from '../form-factory';
import { GroupNode, LeafNode } from '../form-factory/form-node';
import moment from 'moment';
import {
  AppointmentPayload,
  AppointmentResponsePayload
} from './appointment-helper';

@Injectable({
  providedIn: 'root'
})
export class AppointmentAdapter implements ValueAdapter {
  /**
   * Generates the form payload for an appointment.
   * @param {Form} form - The form object.
   * @returns {AppointmentPayload} The generated appointment payload.
   */
  public generateFormPayload(form: Form): AppointmentPayload {
    const uuid = form?.valueProcessingInfo?.appointmentUuid;
    const dateAppointmentIssued =
      form?.valueProcessingInfo?.dateAppointmentIssued;

    const questionNodes = this.findAppointmentQuestionNodes(form.rootNode);
    const payload = this.generateFormPayloadForQuestion(questionNodes);

    // If in edit mode, add the uuid to the payload
    if (uuid) {
      payload.uuid = uuid;
    }

    // Add dateAppointmentIssued to the payload if it exists
    if (dateAppointmentIssued) {
      payload.dateAppointmentIssued = dateAppointmentIssued;
    }

    return payload;
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

  /**
   * Generates the form payload for appointment questions.
   * @param {LeafNode[]} appointmentQuestionNodes - An array of leaf nodes representing appointment questions.
   * @returns {AppointmentPayload} The generated appointment payload.
   */
  private generateFormPayloadForQuestion(
    appointmentQuestionNodes: LeafNode[]
  ): AppointmentPayload {
    const formPayload = appointmentQuestionNodes.reduce<Record<string, string>>(
      (payload, node) => {
        const { appointmentKey } = node.question.extras.questionOptions;
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
      status = 'Scheduled',
      appointmentKind = 'Scheduled',
      ...restOfPayload
    } = formPayload;

    const endDateTime = duration
      ? this.calculateEndDateTime(startDateTime, parseInt(duration, 10))
      : moment(startDateTime).endOf('day').toISOString();

    return {
      ...restOfPayload,
      status,
      appointmentKind,
      locationUuid: location,
      serviceUuid: service,
      providers: [{ uuid: providers }],
      startDateTime: moment(startDateTime).toISOString(),
      endDateTime
    };
  }

  /**
   * Calculates the end date and time based on the start date and time and duration.
   * @param {string} startDateTime - The start date and time in ISO format.
   * @param {number} durationMinutes - The duration in minutes.
   * @returns {string} The calculated end date and time in ISO format.
   */
  private calculateEndDateTime(
    startDateTime: string,
    durationMinutes: number
  ): string {
    return moment(startDateTime).add(durationMinutes, 'minutes').toISOString();
  }
}
