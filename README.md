# Sistema de Gestión de Solicitudes de Soporte TI

Backend desarrollado con NestJS y MySQL para centralizar y gestionar las solicitudes de soporte técnico.

## Historial de Desarrollo

### Etapa 1: Arquitectura inicial
- Creación del proyecto base con NestJS.
- Limpieza de archivos por defecto.
- Creación de la arquitectura MVC (Módulo, Controlador y Servicio) para la gestión de solicitudes.

### Etapa 2: Persistencia y validación
- Configuración de TypeORM, MySQL y variables de entorno (`dotenv`).
- Creación de la entidad `Solicitud` y DTOs basados en arrays constantes.

### Etapa 3: Funcionalidad y reglas
- Implementación de lógica de negocio en el servicio (Reglas RN07, RN08, RN09, RN10).
- Creación del CRUD y endpoint de búsqueda en el controlador.

### Etapa 4: Pruebas y versión final
- Configuración de Swagger y ValidationPipe en archivo principal.
- Verificación técnica y preparación de entrega.