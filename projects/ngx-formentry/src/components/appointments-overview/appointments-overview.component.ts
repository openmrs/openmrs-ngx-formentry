import { Component, OnChanges, Input, OnDestroy } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
import moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ofe-appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})
export class AppointmentsOverviewComponent implements OnChanges, OnDestroy {
  private subscription: Subscription;

  @Input() node: LeafNode;

  currentDate: Date = new Date();
  showAppointments = false;
  loadingAppointments = false;
  errorLoadingAppointments = false;
  appointmentsLoaded = false;
  appointments: Array<any> = [];
  today = '';

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the subscription to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor() {}

  /**
   * Lifecycle hook that is called when the component's data-bound properties change.
   * Subscribes to changes in the node's control value.
   */
  ngOnChanges() {
    this.subscription = this.node.control.valueChanges.subscribe(
      this.handleAppointmentDateChange.bind(this)
    );
  }

  /**
   * Handles changes in the appointment date.
   * Resets properties, gets date range and service type, and fetches appointments if all required data is available.
   * @param {string} appointmentDate - The new appointment date
   * @private
   */
  private handleAppointmentDateChange(appointmentDate: string) {
    this.resetProperties();
    const { startDate, endDate } = this.getDateRange(appointmentDate);
    const serviceTypeUuid = this.getServiceTypeUuid();
    const appointmentDataSource = this.getAppointmentDataSource();

    if (startDate && endDate && appointmentDataSource && serviceTypeUuid) {
      this.fetchAppointments(
        appointmentDataSource,
        startDate,
        endDate,
        serviceTypeUuid
      );
    }
  }

  /**
   * Calculates the start and end date of the month for a given date.
   * @param {string} date - The date to get the range for
   * @returns {{ startDate: string, endDate: string }} An object containing the start and end dates of the month
   * @private
   */
  private getDateRange(date: string) {
    const momentDate = moment(date);
    return {
      startDate: momentDate.startOf('month').toISOString(),
      endDate: momentDate.endOf('month').toISOString()
    };
  }

  /**
   * Retrieves the service type UUID from the form.
   * @returns {string | undefined} The service type UUID, or undefined if not found
   * @private
   */
  private getServiceTypeUuid() {
    const serviceTypeNode = this.node.form.searchNodeByQuestionId(
      'service'
    )[0] as LeafNode;
    if (!serviceTypeNode) {
      return;
    }
    return serviceTypeNode?.control.value;
  }

  /**
   * Retrieves the appointment data source from the form's data sources container.
   * @returns {any} The appointment data source, or undefined if not found
   * @private
   */
  private getAppointmentDataSource() {
    const dataSources = this.node?.form.dataSourcesContainer.dataSources ?? {};
    return dataSources?.appointmentSummaryService;
  }

  /**
   * Fetches appointments for the given date range and service type.
   * @param {any} dataSource - The data source to fetch appointments from
   * @param {string} startDate - The start date of the range
   * @param {string} endDate - The end date of the range
   * @param {string} serviceTypeUuid - The UUID of the service type
   * @private
   */
  private fetchAppointments(
    dataSource,
    startDate: string,
    endDate: string,
    serviceTypeUuid: string
  ) {
    this.showAppointments = true;
    this.loadingAppointments = true;
    this.currentDate = new Date(this.node.control.value);

    dataSource.fetchAppointmentSummaryByDateRange(startDate, endDate).subscribe(
      (appointments) => this.processAppointments(appointments, serviceTypeUuid),
      (error) => console.error(error)
    );
  }

  /**
   * Processes the fetched appointments and updates the component's state.
   * @param {any[]} appointments - The fetched appointments
   * @param {string} serviceTypeUuid - The UUID of the service type
   * @private
   */
  private processAppointments(appointments, serviceTypeUuid: string) {
    const appointmentCountMap =
      appointments.find(
        (appointment) =>
          appointment.appointmentService?.uuid === serviceTypeUuid
      )?.appointmentCountMap ?? [];

    this.appointments = this.createCalendarDistribution(appointmentCountMap);
    this.loadingAppointments = false;
    this.appointmentsLoaded = true;
  }

  /**
   * Creates a calendar distribution from the appointment count map.
   * @param {Record<string, any>} appointmentCountMap - The map of appointment counts
   * @returns {Array<{ date: string, count: number }>} An array of objects containing date and count
   * @private
   */
  private createCalendarDistribution(appointmentCountMap: Record<string, any>) {
    return Object.entries(appointmentCountMap)
      .map(([date, value]) => ({
        date,
        count: value.allAppointmentsCount
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  /**
   * Handles the selection of a date.
   * @param {Date} date - The selected date
   */
  onDateSelected(date: Date) {
    this.node.control.setValue(moment(date).toISOString());
  }

  /**
   * Resets the component's properties to their initial state.
   */
  resetProperties() {
    this.loadingAppointments = false;
    this.appointmentsLoaded = false;
    this.errorLoadingAppointments = false;
    this.showAppointments = false;
    this.appointments = [];
    this.today = '';
  }
}
