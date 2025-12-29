import { Profesor } from '../types';
import { profesores } from './mockData';

export class ProfesorService {
  // Obtener todos los profesores
  static obtenerTodos(): Profesor[] {
    return profesores;
  }

  // Obtener profesor por ID
  static obtenerPorId(id: string): Profesor | undefined {
    return profesores.find(profesor => profesor.id === id);
  }

  // Crear nuevo profesor
  static crear(profesor: Omit<Profesor, 'id'>): Profesor {
    const nuevoProfesor: Profesor = {
      ...profesor,
      id: (profesores.length + 1).toString()
    };
    profesores.push(nuevoProfesor);
    return nuevoProfesor;
  }

  // Actualizar profesor
  static actualizar(id: string, datosActualizados: Partial<Profesor>): Profesor | null {
    const index = profesores.findIndex(profesor => profesor.id === id);
    if (index === -1) return null;
    
    profesores[index] = { ...profesores[index], ...datosActualizados };
    return profesores[index];
  }

  // Eliminar profesor
  static eliminar(id: string): boolean {
    const index = profesores.findIndex(profesor => profesor.id === id);
    if (index === -1) return false;
    
    profesores.splice(index, 1);
    return true;
  }

  // Obtener profesores por grupo
  static obtenerPorGrupo(grupo: string): Profesor[] {
    return profesores.filter(profesor => profesor.grupos.includes(grupo));
  }

  // Buscar profesores por nombre
  static buscarPorNombre(nombre: string): Profesor[] {
    const termino = nombre.toLowerCase();
    return profesores.filter(profesor => 
      profesor.nombre.toLowerCase().includes(termino) ||
      profesor.apellido.toLowerCase().includes(termino)
    );
  }
}

export default ProfesorService;