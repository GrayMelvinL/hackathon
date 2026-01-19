import { IsInt, IsOptional } from 'class-validator';

export class CreatePrescriptionDto {
  @IsInt()
  appointmentId: number;

  @IsInt()
  doctorId: number;

  @IsInt()
  patientId: number;

  @IsOptional()
  notes?: string;
}
