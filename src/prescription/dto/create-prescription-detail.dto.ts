import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePrescriptionDetailDto {
  @IsInt()
  prescriptionId: number;

  @IsNotEmpty()
  medicineName: string;

  @IsNotEmpty()
  dosage: string;

  @IsNotEmpty()
  frequency: string;

  @IsNotEmpty()
  duration: string;
}
