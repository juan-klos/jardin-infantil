export interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  fechaNacimiento: string;
  grupo: string;
  contactoEmergencia: string;
  telefonoContacto: string;
  alergias?: string[];
  observaciones?: string;
}

export interface Profesor {
  id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  email: string;
  grupos: string[];
}

export interface Grupo {
  id: string;
  nombre: string;
  edadMinima: number;
  edadMaxima: number;
  profesorId: string;
  capacidad: number;
  estudiantes: string[];
}

export interface Asistencia {
  id: string;
  estudianteId: string;
  fecha: string;
  presente: boolean;
  observaciones?: string;
}

export interface Nota {
  id: string;
  estudianteId: string;
  fecha: string;
  materia: string;
  valor: number;
  observaciones?: string;
}