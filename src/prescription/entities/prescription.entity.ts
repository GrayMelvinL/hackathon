export class PrescriptionEntity {
  id: number;
  appointmentId: number;
  doctorId: number;
  patientId: number;
  notes: string | null;
  createdAt: Date;
}
