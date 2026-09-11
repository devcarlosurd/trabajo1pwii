import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('solicitudes')
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  cliente: string;

  @Column()
  categoria: string;

  @Column()
  prioridad: string;

  // Regla RN05: estado inicial
  @Column({ default: 'Pendiente' })
  estado: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  fechaSolicitud: string;
}