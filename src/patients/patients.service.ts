import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientEntity } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePatientDto): Promise<PatientEntity> {
    return this.prisma.patient.create({
      data: dto,
    });
  }

  async findAll(): Promise<PatientEntity[]> {
    return this.prisma.patient.findMany();
  }

  async findOne(id: number): Promise<PatientEntity> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }

    return patient;
  }

  async update(
    id: number,
    dto: UpdatePatientDto,
  ): Promise<PatientEntity> {
    await this.findOne(id);

    return this.prisma.patient.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<PatientEntity> {
    await this.findOne(id);

    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
