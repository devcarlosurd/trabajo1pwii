import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './solicitudes/entities/solicitud.entity.js';
import { SolicitudesModule } from './solicitudes/solicitudes.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Solicitud],
      synchronize: true // SOLO en desarrollo
    }),
    SolicitudesModule
  ],
})
export class AppModule {}