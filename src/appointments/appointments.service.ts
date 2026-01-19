import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
    // pastikan patient ada
    const patient = await this.prisma.patient.findUnique({
      where: { id: dto.patientId },
    });
    if (!patient) {
      throw new BadRequestException('Patient not found');
    }

    // pastikan doctor ada
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: dto.doctorId },
    });
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }

    return this.prisma.appointment.create({
      data: {
        patientId: dto.patientId,
        doctorId: dto.doctorId,
        schedule: new Date(dto.schedule),
        status: dto.status,
        notes: dto.notes,
      },
    });
  }

  // READ ALL
  async findAll(): Promise<AppointmentEntity[]> {
    return this.prisma.appointment.findMany();
  }

  // READ ONE
  async findOne(id: number): Promise<AppointmentEntity> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }

    return appointment;
  }

  // UPDATE
  async update(
    id: number,
    dto: UpdateAppointmentDto,
  ): Promise<AppointmentEntity> {
    await this.findOne(id);

    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...dto,
        schedule: dto.schedule ? new Date(dto.schedule) : undefined,
      },
    });
  }

  // DELETE
  async remove(id: number): Promise<AppointmentEntity> {
    await this.findOne(id);

    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
