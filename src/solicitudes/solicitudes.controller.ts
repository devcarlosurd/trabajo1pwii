import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSolicitudDto } from './dto/create-solicitud.dto.js';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto.js';
import { SolicitudesService } from './solicitudes.service.js';

@ApiTags('solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly service: SolicitudesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // IMPORTANTE: /buscar siempre debe ir arriba de /:id para que NestJS no lo confunda
  @Get('buscar')
  buscar(
    @Query('estado') estado?: string, 
    @Query('prioridad') prioridad?: string,
    @Query('categoria') categoria?: string
  ) {
    return this.service.buscar(estado, prioridad, categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id)); 
  }

  @Post()
  create(@Body() dto: CreateSolicitudDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSolicitudDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}