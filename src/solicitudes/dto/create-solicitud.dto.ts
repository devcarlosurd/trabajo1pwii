import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';

export const CATEGORIAS = ['Hardware', 'Software', 'Redes', 'Seguridad', 'Soporte Usuario'] as const;
export type Categoria = typeof CATEGORIAS[number];

export const PRIORIDADES = ['Baja', 'Media', 'Alta', 'Crítica'] as const;
export type Prioridad = typeof PRIORIDADES[number];

export class CreateSolicitudDto {
  @ApiProperty()
  @IsString() @MinLength(5)
  titulo: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  cliente: string;

  @ApiProperty({ enum: CATEGORIAS })
  @IsIn(CATEGORIAS as unknown as string[])
  categoria: Categoria;

  @ApiProperty({ enum: PRIORIDADES })
  @IsIn(PRIORIDADES as unknown as string[])
  prioridad: Prioridad;

  @ApiProperty()
  @IsString() @MinLength(15)
  descripcion: string;

  @ApiProperty({ example: '2026-09-11' })
  @IsString() @IsNotEmpty()
  fechaSolicitud: string;
}