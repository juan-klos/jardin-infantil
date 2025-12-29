import { Estudiante } from '../types';
import { estudiantes } from './mockData';

export class EstudianteService {
  // Obtener todos los estudiantes
  static obtenerTodos(): Estudiante[] {
    return estudiantes;
  }

  // Obtener estudiante por ID
  static obtenerPorId(id: string): Estudiante | undefined {
    return estudiantes.find(estudiante => estudiante.id === id);
  }

  // Crear nuevo estudiante
  static crear(estudiante: Omit<Estudiante, 'id'>): Estudiante {
    const nuevoEstudiante: Estudiante = {
      ...estudiante,
      id: (estudiantes.length + 1).toString()
    };
    estudiantes.push(nuevoEstudiante);
    return nuevoEstudiante;
  }

  // Actualizar estudiante
  static actualizar(id: string, datosActualizados: Partial<Estudiante>): Estudiante | null {
    const index = estudiantes.findIndex(estudiante => estudiante.id === id);
    if (index === -1) return null;
    
    estudiantes[index] = { ...estudiantes[index], ...datosActualizados };
    return estudiantes[index];
  }

  // Eliminar estudiante
  static eliminar(id: string): boolean {
    const index = estudiantes.findIndex(estudiante => estudiante.id === id);
    if (index === -1) return false;
    
    estudiantes.splice(index, 1);
    return true;
  }

  // Obtener estudiantes por grupo
  static obtenerPorGrupo(grupo: string): Estudiante[] {
    return estudiantes.filter(estudiante => estudiante.grupo === grupo);
  }

  // Buscar estudiantes por nombre
  static buscarPorNombre(nombre: string): Estudiante[] {
    const termino = nombre.toLowerCase();
    return estudiantes.filter(estudiante => 
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido.toLowerCase().includes(termino)
    );
  }
}

export default EstudianteService;