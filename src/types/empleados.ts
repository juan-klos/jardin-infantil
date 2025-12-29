
export interface Empleado {
    id: string;
    nombre: string;
    apellido: string;
    rut: string;
    cargo: string; // 'Educadora', 'Tecnico', 'Auxiliar', 'Administrativo'
    email: string;
    telefono: string;
    fechaNacimiento: string; // YYYY-MM-DD
    fechaIngreso: string; // YYYY-MM-DD
}

export interface RegistroAsistenciaEmpleado {
    id: string;
    empleadoId: string;
    fecha: string; // YYYY-MM-DD
    horaEntrada: string; // HH:mm
    horaSalida?: string; // HH:mm
    tipo: 'Normal' | 'Turno' | 'Atraso';
}

export interface AusenciaEmpleado {
    id: string;
    empleadoId: string;
    fechaInicio: string; // YYYY-MM-DD
    fechaFin: string; // YYYY-MM-DD
    tipo: 'Licencia Medica' | 'Permiso Administrativo' | 'Vacaciones' | 'Injustificada' | 'Capacitacion';
    observacion?: string;
}
