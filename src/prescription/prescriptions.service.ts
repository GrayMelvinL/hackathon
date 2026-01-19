import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';

import { PrescriptionEntity } from './entities/prescription.entity';
import { PrescriptionDetailEntity } from './entities/prescription-detail.entity';

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  // CREATE PRESCRIPTION
  async create(
    dto: CreatePrescriptionDto,
  ): Promise<PrescriptionEntity> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: dto.appointmentId },
    });

    if (!appointment) {
      throw new BadRequestException('Appointment not found');
    }

    return this.prisma.prescription.create({
      data: dto,
    });
  }

  // ADD DETAIL (OBAT)
  async addDetail(
    dto: CreatePrescriptionDetailDto,
  ): Promise<PrescriptionDetailEntity> {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id: dto.prescriptionId },
    });

    if (!prescription) {
      throw new BadRequestException('Prescription not found');
    }

    return this.prisma.prescriptionDetail.create({
      data: dto,
    });
  }

  // READ ALL
  async findAll(): Promise<PrescriptionEntity[]> {
    return this.prisma.prescription.findMany();
  }

  // READ ONE
  async findOne(id: number): Promise<PrescriptionEntity> {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
    });

    if (!prescription) {
      throw new NotFoundException(
        `Prescription with id ${id} not found`,
      );
    }

    return prescription;
  }

  // UPDATE
  async update(
    id: number,
    dto: UpdatePrescriptionDto,
  ): Promise<PrescriptionEntity> {
    await this.findOne(id);

    return this.prisma.prescription.update({
      where: { id },
      data: dto,
    });
  }

  // DELETE
  async remove(id: number): Promise<PrescriptionEntity> {
    await this.findOne(id);

    return this.prisma.prescription.delete({
      where: { id },
    });
  }
}
