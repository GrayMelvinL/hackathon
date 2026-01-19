import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';

import { PrescriptionEntity } from './entities/prescription.entity';
import { PrescriptionDetailEntity } from './entities/prescription-detail.entity';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly service: PrescriptionsService) {}

  @Post()
  create(
    @Body() dto: CreatePrescriptionDto,
  ): Promise<PrescriptionEntity> {
    return this.service.create(dto);
  }

  @Post('detail')
  addDetail(
    @Body() dto: CreatePrescriptionDetailDto,
  ): Promise<PrescriptionDetailEntity> {
    return this.service.addDetail(dto);
  }

  @Get()
  findAll(): Promise<PrescriptionEntity[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<PrescriptionEntity> {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePrescriptionDto,
  ): Promise<PrescriptionEntity> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ): Promise<PrescriptionEntity> {
    return this.service.remove(+id);
  }
}
