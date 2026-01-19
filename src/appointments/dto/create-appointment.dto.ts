import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  doctorId: number;

  @IsDateString()
  schedule: string;

  @IsNotEmpty()
  status: string;

  notes?: string;
}
