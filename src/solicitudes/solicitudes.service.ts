import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSolicitudDto } from './dto/create-solicitud.dto.js';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto.js';
import { Solicitud } from './entities/solicitud.entity.js';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitud)
    private repo: Repository<Solicitud>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const found = await this.repo.findOne({ where: { id } });
    // Regla RN10: Responder con error adecuado si no existe
    if (!found) throw new NotFoundException({ error: 'Solicitud no encontrada' });
    return found;
  }

  async buscar(estado?: string, prioridad?: string, categoria?: string) {
    //actv6
    const qb = this.repo.createQueryBuilder('s');
    if (estado) qb.andWhere('s.estado = :estado', { estado });
    if (prioridad) qb.andWhere('s.prioridad = :prioridad', { prioridad });
    if (categoria) qb.andWhere('s.categoria = :categoria', { categoria });
    return qb.getMany();
  }

  create(dto: CreateSolicitudDto) {
    // Regla RN07: Validar que la fecha no sea en el futuro
    const fechaInput = new Date(dto.fechaSolicitud);
    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    fechaInput.setHours(0,0,0,0);

    if (fechaInput > hoy) {
      throw new BadRequestException({ error: 'La fecha no puede ser en el futuro' });
    }

    const ent = this.repo.create(dto);
    return this.repo.save(ent);
  }

  async update(id: number, dto: UpdateSolicitudDto) {
    const prev = await this.findOne(id); // Aquí también validamos la RN10

    // Regla RN09: Una solicitud Finalizada no puede volver a Pendiente
    if (dto.estado) {
      if (prev.estado === 'Finalizada' && dto.estado === 'Pendiente') {
        throw new BadRequestException({ error: 'No se puede pasar de Finalizada a Pendiente' });
      }
    }

    Object.assign(prev, dto);
    return this.repo.save(prev);
  }

  async remove(id: number) {
    const prev = await this.findOne(id);

    // Regla RN08: Para eliminarla deberá encontrarse en estado Finalizada
    if (prev.estado !== 'Finalizada') {
      throw new BadRequestException({ error: 'Solo se pueden eliminar solicitudes en estado Finalizada' });
    }

    await this.repo.remove(prev);
    // Retornamos como en la actv6
    return { ok: true };
  }
}