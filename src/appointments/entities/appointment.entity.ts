export class AppointmentEntity {
  id: number;
  patientId: number;
  doctorId: number;
  schedule: Date;
  status: string;
  notes: string | null;
  createdAt: Date;
}
