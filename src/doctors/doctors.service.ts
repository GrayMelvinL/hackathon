import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorEntity } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDoctorDto): Promise<DoctorEntity> {
    return this.prisma.doctor.create({
      data: dto,
    });
  }

  async findAll(): Promise<DoctorEntity[]> {
    return this.prisma.doctor.findMany();
  }

  async findOne(id: number): Promise<DoctorEntity> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }

    return doctor;
  }

  async update(
    id: number,
    dto: UpdateDoctorDto,
  ): Promise<DoctorEntity> {
    await this.findOne(id);

    return this.prisma.doctor.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<DoctorEntity> {
    await this.findOne(id);

    return this.prisma.doctor.delete({
      where: { id },
    });
  }
}
