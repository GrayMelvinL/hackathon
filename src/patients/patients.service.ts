import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const data: any = { ...createPatientDto };
    if (data.birth_date) data.birth_date = new Date(data.birth_date);
    return this.prisma.patients.create({ data });
  }

  async findAll(opts?: { skip?: number; take?: number; searchName?: string }) {
    const { skip = 0, take = 20, searchName } = opts || {};
    const where: any = {};
    if (searchName) where.name = { contains: searchName, mode: 'insensitive' };
    return this.prisma.patients.findMany({ where, skip, take, orderBy: { name: 'asc' } });
  }

  async findOne(patients_id: string) {
    return this.prisma.patients.findUnique({ where: { patients_id } });
  }

  async update(patients_id: string, updatePatientDto: UpdatePatientDto) {
    const data: any = { ...updatePatientDto };
    if (data.birth_date) data.birth_date = new Date(data.birth_date);
    return this.prisma.patients.update({ where: { patients_id }, data });
  }

  async remove(patients_id: string) {
    return this.prisma.patients.delete({ where: { patients_id } });
  }
}
