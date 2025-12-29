
import { Empleado, RegistroAsistenciaEmpleado, AusenciaEmpleado } from '../types/empleados';

// Mock data inicial
let empleados: Empleado[] = [
    {
        id: '1',
        nombre: 'Maria',
        apellido: 'Gonzalez',
        rut: '12.345.678-9',
        cargo: 'Educadora',
        email: 'maria.gonzalez@jardin.cl',
        telefono: '+56912345678',
        fechaNacimiento: '1985-05-12',
        fechaIngreso: '2020-03-01'
    },
    {
        id: '2',
        nombre: 'Carla',
        apellido: 'Tapia',
        rut: '13.456.789-0',
        cargo: 'Tecnico',
        email: 'carla.tapia@jardin.cl',
        telefono: '+56987654321',
        fechaNacimiento: '1990-08-25',
        fechaIngreso: '2021-04-15'
    }
];

let asistencias: RegistroAsistenciaEmpleado[] = [];
let ausencias: AusenciaEmpleado[] = [];

const EmpleadoService = {
    obtenerTodos: (): Empleado[] => {
        return [...empleados];
    },

    obtenerPorId: (id: string): Empleado | undefined => {
        return empleados.find(e => e.id === id);
    },

    registrarEmpleado: (empleado: Omit<Empleado, 'id'>): Empleado => {
        const nuevoEmpleado = {
            ...empleado,
            id: Math.random().toString(36).substr(2, 9)
        };
        empleados.push(nuevoEmpleado);
        return nuevoEmpleado;
    },

    marcarEntrada: (empleadoId: string): RegistroAsistenciaEmpleado => {
        const ahora = new Date();
        const nuevaAsistencia: RegistroAsistenciaEmpleado = {
            id: Math.random().toString(36).substr(2, 9),
            empleadoId,
            fecha: ahora.toISOString().split('T')[0],
            horaEntrada: ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
            tipo: 'Normal'
        };
        asistencias.push(nuevaAsistencia);
        return nuevaAsistencia;
    },

    marcarSalida: (asistenciaId: string): RegistroAsistenciaEmpleado | undefined => {
        const asistencia = asistencias.find(a => a.id === asistenciaId);
        if (asistencia) {
            asistencia.horaSalida = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        }
        return asistencia;
    },

    obtenerAsistenciaHoy: (empleadoId: string): RegistroAsistenciaEmpleado | undefined => {
        const hoy = new Date().toISOString().split('T')[0];
        return asistencias.find(a => a.empleadoId === empleadoId && a.fecha === hoy);
    }
};

export default EmpleadoService;
