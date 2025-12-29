import { Grupo, Asistencia, Nota } from '../types';
import { estudiantes, profesores } from './mockData';

// Datos mock para grupos
const grupos: Grupo[] = [
  {
    id: 'A',
    nombre: 'Grupo A - Preescolar',
    edadMinima: 3,
    edadMaxima: 4,
    capacidad: 15,
    profesorId: '1'
  },
  {
    id: 'B',
    nombre: 'Grupo B - Maternal',
    edadMinima: 2,
    edadMaxima: 3,
    capacidad: 12,
    profesorId: '2'
  },
  {
    id: 'C',
    nombre: 'Grupo C - Preescolar Avanzado',
    edadMinima: 4,
    edadMaxima: 5,
    capacidad: 18,
    profesorId: '1'
  }
];

// Datos mock para asistencias
const asistencias: Asistencia[] = [
  {
    id: '1',
    estudianteId: '1',
    fecha: '2025-12-22',
    presente: true,
    observaciones: 'Llegó puntual'
  },
  {
    id: '2',
    estudianteId: '2',
    fecha: '2025-12-22',
    presente: false,
    observaciones: 'Enfermo'
  }
];

// Datos mock para notas
const notas: Nota[] = [
  {
    id: '1',
    estudianteId: '1',
    fecha: '2025-12-20',
    materia: 'Matemáticas',
    calificacion: 9,
    observaciones: 'Excelente trabajo'
  },
  {
    id: '2',
    estudianteId: '2',
    fecha: '2025-12-20',
    materia: 'Arte',
    calificacion: 8,
    observaciones: 'Muy creativo'
  }
];

export class GrupoService {
  // Obtener todos los grupos
  static obtenerTodos(): Grupo[] {
    return grupos;
  }

  // Obtener grupo por ID
  static obtenerPorId(id: string): Grupo | undefined {
    return grupos.find(grupo => grupo.id === id);
  }

  // Crear nuevo grupo
  static crear(grupo: Omit<Grupo, 'id'>): Grupo {
    const nuevoGrupo: Grupo = {
      ...grupo,
      id: (grupos.length + 1).toString()
    };
    grupos.push(nuevoGrupo);
    return nuevoGrupo;
  }

  // Actualizar grupo
  static actualizar(id: string, datosActualizados: Partial<Grupo>): Grupo | null {
    const index = grupos.findIndex(grupo => grupo.id === id);
    if (index === -1) return null;
    
    grupos[index] = { ...grupos[index], ...datosActualizados };
    return grupos[index];
  }

  // Eliminar grupo
  static eliminar(id: string): boolean {
    const index = grupos.findIndex(grupo => grupo.id === id);
    if (index === -1) return false;
    
    grupos.splice(index, 1);
    return true;
  }

  // Obtener estudiantes de un grupo
  static obtenerEstudiantes(grupoId: string) {
    return estudiantes.filter(estudiante => estudiante.grupo === grupoId);
  }

  // Obtener profesor del grupo
  static obtenerProfesor(grupoId: string) {
    const grupo = grupos.find(g => g.id === grupoId);
    if (!grupo) return null;
    return profesores.find(profesor => profesor.id === grupo.profesorId);
  }
}

export class AsistenciaService {
  // Registrar asistencia
  static registrar(asistencia: Omit<Asistencia, 'id'>): Asistencia {
    const nuevaAsistencia: Asistencia = {
      ...asistencia,
      id: (asistencias.length + 1).toString()
    };
    asistencias.push(nuevaAsistencia);
    return nuevaAsistencia;
  }

  // Obtener asistencias por estudiante
  static obtenerPorEstudiante(estudianteId: string): Asistencia[] {
    return asistencias.filter(asistencia => asistencia.estudianteId === estudianteId);
  }

  // Obtener asistencias por fecha
  static obtenerPorFecha(fecha: string): Asistencia[] {
    return asistencias.filter(asistencia => asistencia.fecha === fecha);
  }

  // Obtener estadísticas de asistencia
  static obtenerEstadisticas(fecha: string) {
    const asistenciasDelDia = asistencias.filter(a => a.fecha === fecha);
    const total = asistenciasDelDia.length;
    const presentes = asistenciasDelDia.filter(a => a.presente).length;
    const ausentes = total - presentes;
    
    return {
      total,
      presentes,
      ausentes,
      porcentajeAsistencia: total > 0 ? (presentes / total) * 100 : 0
    };
  }
}

export class NotaService {
  // Registrar nota
  static registrar(nota: Omit<Nota, 'id'>): Nota {
    const nuevaNota: Nota = {
      ...nota,
      id: (notas.length + 1).toString()
    };
    notas.push(nuevaNota);
    return nuevaNota;
  }

  // Obtener notas por estudiante
  static obtenerPorEstudiante(estudianteId: string): Nota[] {
    return notas.filter(nota => nota.estudianteId === estudianteId);
  }

  // Obtener promedio por estudiante
  static obtenerPromedio(estudianteId: string): number {
    const notasEstudiante = notas.filter(nota => nota.estudianteId === estudianteId);
    if (notasEstudiante.length === 0) return 0;
    
    const suma = notasEstudiante.reduce((total, nota) => total + nota.calificacion, 0);
    return suma / notasEstudiante.length;
  }

  // Obtener notas por materia
  static obtenerPorMateria(materia: string): Nota[] {
    return notas.filter(nota => nota.materia === materia);
  }
}

export default { GrupoService, AsistenciaService, NotaService };