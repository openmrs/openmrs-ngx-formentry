export interface AppointmentResponsePayload {
  uuid: string;
  appointmentNumber: string;
  dateCreated: number;
  dateAppointmentScheduled: number;
  patient: {
    OpenMRSID: string;
    identifier: string;
    UniquePatientNumber: string;
    gender: string;
    name: string;
    uuid: string;
    age: number;
    customAttributes: Record<string, unknown>;
  };
  service: {
    appointmentServiceId: number;
    name: string;
    description: string | null;
    speciality: Record<string, unknown>;
    startTime: string;
    endTime: string;
    maxAppointmentsLimit: number | null;
    durationMins: number | null;
    location: Record<string, unknown>;
    uuid: string;
    color: string;
    initialAppointmentStatus: string | null;
    creatorName: string | null;
  };
  serviceType: unknown | null;
  provider: unknown | null;
  location: {
    name: string;
    uuid: string;
  };
  startDateTime: number;
  endDateTime: number;
  appointmentKind: string;
  status: string;
  comments: string;
  additionalInfo: unknown | null;
  teleconsultation: unknown | null;
  providers: Array<{
    uuid: string;
    comments: string | null;
    response: string;
    name: string;
  }>;
  voided: boolean;
  extensions: {
    patientEmailDefined: boolean;
  };
  teleconsultationLink: string | null;
  priority: unknown | null;
  recurring: boolean;
}
