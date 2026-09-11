import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSolicitudDto } from './create-solicitud.dto.js';
import { IsIn, IsOptional } from 'class-validator';

const ESTADOS = ['Pendiente', 'En Proceso', 'Finalizada'] as const;

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDto) {
  @ApiPropertyOptional({ enum: ESTADOS })
  @IsOptional()
  @IsIn(ESTADOS as unknown as string[])
  estado?: string;
}