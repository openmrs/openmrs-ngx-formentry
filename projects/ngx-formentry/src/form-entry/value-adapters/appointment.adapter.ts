import { Injectable } from '@angular/core';
import { ValueAdapter } from './value.adapter';
import { Form } from '../form-factory';
import { GroupNode, LeafNode } from '../form-factory/form-node';
import {
  AppointmentPayload,
  AppointmentResponsePayload
} from './appointment-helper';
import moment from 'moment';

/**
 * @class AppointmentAdapter
 * @implements {ValueAdapter}
 * @description Adapter class for handling appointment-related form operations.
 * This class is responsible for generating payloads from form data and populating
 * forms with appointment data.
 */
@Injectable({
  providedIn: 'root'
})
export class AppointmentAdapter implements ValueAdapter {
  /**
   * Generates a form payload for an appointment based on the provided form data.
   * @param {Form} form - The form object containing appointment data.
   * @returns {AppointmentPayload | AppointmentPayload[]} The generated appointment payload(s).
   */
  public generateFormPayload(
    form: Form
  ): AppointmentPayload | AppointmentPayload[] {
    const questionNodes = this.findAppointmentQuestionNodes(form.rootNode);

    if (!questionNodes.length) {
      return {} as AppointmentPayload;
    }

    return this.generateFormPayloadForQuestion(questionNodes, form);
  }

  /**
   * Populates a form with appointment data from a response payload.
   * @param {Form} form - The form to be populated.
   * @param {AppointmentResponsePayload} payload - The appointment response payload.
   */
  public populateForm(
    form: Form,
    payload: Array<AppointmentResponsePayload>
  ): void {
    const questionNodes = this.findAppointmentQuestionNodes(form.rootNode);
    if (!questionNodes.length) return;

    this.populateFormForQuestion(questionNodes, payload);
  }

  /**
   * Finds all appointment question nodes in a form.
   * @param {GroupNode} formNode - The root node of the form.
   * @returns {LeafNode[]} An array of leaf nodes representing appointment questions.
   */
  public findAppointmentQuestionNodes(formNode: GroupNode): LeafNode[] {
    const appointmentNodes: LeafNode[] = [];

    const traverseNode = (node: GroupNode | LeafNode): void => {
      if (node instanceof GroupNode) {
        Object.values(node.children).forEach(traverseNode);
      } else if (
        node instanceof LeafNode &&
        node.question.extras?.type === 'appointment'
      ) {
        appointmentNodes.push(node);
      }
    };

    traverseNode(formNode);
    return appointmentNodes;
  }

  /**
   * Populates form question nodes with data from the appointment response payload.
   * @param {LeafNode[]} appointmentQuestionNodes - Array of leaf nodes representing appointment questions.
   * @param {AppointmentResponsePayload} payload - The appointment response payload.
   * @private
   */
  private populateFormForQuestion(
    appointmentQuestionNodes: LeafNode[],
    payload: Array<AppointmentResponsePayload>
  ): void {
    if (payload.length > 0) {
      appointmentQuestionNodes.forEach((node) => {
        node.control.hidden = true;
        node.control.hide();
      });
    }
  }

  /**
   * Calculates the duration of an appointment in minutes.
   * @param {AppointmentResponsePayload} payload - The appointment response payload.
   * @returns {string} The duration in minutes as a string.
   * @private
   */
  private calculateDuration(payload: AppointmentResponsePayload): string {
    return moment
      .duration(moment(payload.endDateTime).diff(payload.startDateTime))
      .asMinutes()
      .toString();
  }

  /**
   * Groups and cleans the keys of an object.
   * @param {Record<string, any>} obj - The object to group and clean.
   * @returns {Array<{ key: string; value: any }>} An array of key-value pairs with cleaned keys.
   * @private
   */
  private groupAndCleanKeys(
    obj: Record<string, any>
  ): Array<{ key: string; value: any }> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanKey = key.replace(/\d+$/, '');

      if (
        typeof value === 'string' ||
        Array.isArray(value) ||
        value instanceof Date
      ) {
        acc.push({ key: cleanKey, value });
      } else if (typeof value === 'object' && value !== null) {
        acc.push({ key: cleanKey, value: JSON.stringify(value) });
      }

      return acc;
    }, [] as Array<{ key: string; value: any }>);
  }

  /**
   * Transforms an array of key-value pairs into an array of grouped objects.
   * @param {Array<{ key: string; value: any }>} input - The array of key-value pairs.
   * @returns {Array<Record<string, any>>} An array of grouped objects.
   * @private
   */
  private transformAppointmentArray(
    input: Array<{ key: string; value: any }>
  ): Array<Record<string, any>> {
    const groupedEntries: Record<number, Record<string, any>> = {};
    input.forEach((item) => {
      const groupIndex = Math.floor(input.indexOf(item) / 5);
      if (!groupedEntries[groupIndex]) {
        groupedEntries[groupIndex] = {};
      }
      groupedEntries[groupIndex][item.key] = item.value;
    });

    return Object.values(groupedEntries);
  }

  /**
   * Generates a form payload for appointment questions.
   * @param {LeafNode[]} appointmentQuestionNodes - Array of leaf nodes representing appointment questions.
   * @param {Form} form - The form object.
   * @returns {AppointmentPayload | AppointmentPayload[]} The generated appointment payload(s).
   * @private
   */
  private generateFormPayloadForQuestion(
    appointmentQuestionNodes: LeafNode[],
    form: Form
  ): AppointmentPayload | AppointmentPayload[] {
    const { dateAppointmentScheduled } = form?.valueProcessingInfo || {};
    const formPayload = appointmentQuestionNodes.reduce<Record<string, string>>(
      (payload, node) => {
        const { appointmentKey } = node.question.extras.questionOptions;
        payload[appointmentKey + node.nodeIndex] = node.control.value;
        return payload;
      },
      {}
    );

    const groupedPayload = this.groupAndCleanKeys(formPayload);
    const transformedPayload = this.transformAppointmentArray(groupedPayload);

    const finalPayload = transformedPayload.map((group) => {
      const {
        providers,
        startDateTime,
        duration,
        service,
        location,
        status = 'Scheduled',
        appointmentKind = 'Scheduled',
        ...restOfPayload
      } = group;

      const endDateTime = duration
        ? this.calculateEndDateTime(startDateTime, parseInt(duration, 10))
        : moment(startDateTime).endOf('day').toISOString();

      const payloadWithoutUndefined: Record<string, any> = {
        ...restOfPayload,
        status,
        appointmentKind,
        locationUuid: location,
        serviceUuid: service,
        providers: [{ uuid: providers }],
        startDateTime: moment(startDateTime).toISOString(),
        endDateTime,
        dateAppointmentScheduled
      };
      return payloadWithoutUndefined;
    });

    return finalPayload as Array<AppointmentPayload>;
  }

  /**
   * Calculates the end date and time of an appointment based on the start time and duration.
   * @param {string} startDateTime - The start date and time of the appointment.
   * @param {number} durationMinutes - The duration of the appointment in minutes.
   * @returns {string} The calculated end date and time as an ISO string.
   * @private
   */
  private calculateEndDateTime(
    startDateTime: string,
    durationMinutes: number
  ): string {
    return moment(startDateTime).add(durationMinutes, 'minutes').toISOString();
  }
}
