import { Estudiante, Profesor, Grupo, Asistencia, Nota } from '../types';

// Datos de ejemplo para el sistema
export const estudiantes: Estudiante[] = [
  {
    id: '1',
    nombre: 'María',
    apellido: 'García',
    edad: 4,
    fechaNacimiento: '2021-03-15',
    grupo: 'A',
    contactoEmergencia: 'Ana García',
    telefonoContacto: '555-1234',
    alergias: ['lácteos'],
    observaciones: 'Niña muy activa'
  },
  {
    id: '2',
    nombre: 'Carlos',
    apellido: 'López',
    edad: 3,
    fechaNacimiento: '2022-06-20',
    grupo: 'B',
    contactoEmergencia: 'Laura López',
    telefonoContacto: '555-5678',
    observaciones: 'Le gusta pintar'
  }
];

export const profesores: Profesor[] = [
  {
    id: '1',
    nombre: 'Ana',
    apellido: 'Martínez',
    especialidad: 'Educación Infantil',
    telefono: '555-9876',
    email: 'ana.martinez@jardin.com',
    grupos: ['A', 'C']
  },
  {
    id: '2',
    nombre: 'Pedro',
    apellido: 'Rodríguez',
    especialidad: 'Psicopedagogía',
    telefono: '555-5432',
    email: 'pedro.rodriguez@jardin.com',
    grupos: ['B']
  }
];

export const grupos: Grupo[] = [
  {
    id: 'A',
    nombre: 'Grupo A - 3-4 años',
    edadMinima: 3,
    edadMaxima: 4,
    profesorId: '1',
    capacidad: 15,
    estudiantes: ['1']
  },
  {
    id: 'B',
    nombre: 'Grupo B - 2-3 años',
    edadMinima: 2,
    edadMaxima: 3,
    profesorId: '2',
    capacidad: 12,
    estudiantes: ['2']
  }
];