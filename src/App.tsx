import React, { useState } from 'react';
import EstudianteService from './services/EstudianteService';
import ProfesorService from './services/ProfesorService';
import { GrupoService, AsistenciaService, NotaService } from './services/GrupoService';
import { Estudiante, Profesor, Grupo } from './types';

const App: React.FC = () => {
  const [vistaActual, setVistaActual] = useState<'estudiantes' | 'profesores' | 'grupos' | 'asistencias' | 'personal'>('estudiantes');
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>(EstudianteService.obtenerTodos());
  const [profesores, setProfesores] = useState<Profesor[]>(ProfesorService.obtenerTodos());
  const [grupos, setGrupos] = useState<Grupo[]>(GrupoService.obtenerTodos());
  // No necesitamos estado local para empleados aun si usamos el servicio directamente en el render, pero seguimos el patrón
  const [empleados, setEmpleados] = useState(EmpleadoService.obtenerTodos());

  const handleMarcarEntrada = (id: string) => {
    EmpleadoService.marcarEntrada(id);
    setEmpleados([...EmpleadoService.obtenerTodos()]); // Forzar re-render simple
  };

  const handleMarcarSalida = (asistenciaId: string) => {
    EmpleadoService.marcarSalida(asistenciaId);
    setEmpleados([...EmpleadoService.obtenerTodos()]);
  };

  const renderPersonal = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Gestión de Personal</h2>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>+ Nuevo Empleado</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Cargo</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Asistencia Hoy</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(empleado => {
            const asistenciaHoy = EmpleadoService.obtenerAsistenciaHoy(empleado.id);
            return (
              <tr key={empleado.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <div style={{ fontWeight: 'bold' }}>{empleado.nombre} {empleado.apellido}</div>
                  <div style={{ fontSize: '0.8em', color: '#666' }}>{empleado.email}</div>
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{empleado.cargo}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {asistenciaHoy ? (
                    <div>
                      <span style={{ color: 'green' }}>Entrada: {asistenciaHoy.horaEntrada}</span>
                      {asistenciaHoy.horaSalida && <span style={{ display: 'block', color: 'blue' }}>Salida: {asistenciaHoy.horaSalida}</span>}
                    </div>
                  ) : (
                    <span style={{ color: '#999' }}>No registrada</span>
                  )}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {!asistenciaHoy ? (
                    <button
                      onClick={() => handleMarcarEntrada(empleado.id)}
                      style={{ padding: '5px 10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      Marcar Entrada
                    </button>
                  ) : !asistenciaHoy.horaSalida ? (
                    <button
                      onClick={() => handleMarcarSalida(asistenciaHoy.id)}
                      style={{ padding: '5px 10px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      Marcar Salida
                    </button>
                  ) : (
                    <span style={{ color: 'green' }}>Jornada Completa</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEstudiantes = () => (
    <div>
      <h2>Lista de Estudiantes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Edad</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Grupo</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Contacto</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(estudiante => (
            <tr key={estudiante.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {estudiante.nombre} {estudiante.apellido}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{estudiante.edad}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{estudiante.grupo}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {estudiante.contactoEmergencia} - {estudiante.telefonoContacto}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderProfesores = () => (
    <div>
      <h2>Lista de Profesores</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Especialidad</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Grupos</th>
          </tr>
        </thead>
        <tbody>
          {profesores.map(profesor => (
            <tr key={profesor.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {profesor.nombre} {profesor.apellido}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{profesor.especialidad}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{profesor.email}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{profesor.grupos.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGrupos = () => (
    <div>
      <h2>Lista de Grupos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Edades</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Capacidad</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Profesor</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map(grupo => (
            <tr key={grupo.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{grupo.nombre}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {grupo.edadMinima}-{grupo.edadMaxima} años
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{grupo.capacidad}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {GrupoService.obtenerProfesor(grupo.id)?.nombre || 'Sin asignar'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAsistencias = () => (
    <div>
      <h2>Asistencias del Día</h2>
      <p>Fecha: {new Date().toLocaleDateString('es-ES')}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Estudiante</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Grupo</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Estado</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(estudiante => {
            const asistenciaHoy = AsistenciaService.obtenerPorFecha(new Date().toISOString().split('T')[0])
              .find(a => a.estudianteId === estudiante.id);

            return (
              <tr key={estudiante.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {estudiante.nombre} {estudiante.apellido}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{estudiante.grupo}</td>
                <td style={{
                  border: '1px solid #ccc',
                  padding: '8px',
                  backgroundColor: asistenciaHoy?.presente ? '#d4edda' : '#f8d7da'
                }}>
                  {asistenciaHoy ? (asistenciaHoy.presente ? 'Presente' : 'Ausente') : 'No registrado'}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {asistenciaHoy?.observaciones || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>
        Sistema de Gestión Escolar - Jardín Infantil
      </h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => setVistaActual('estudiantes')}
          style={{
            padding: '10px 20px',
            backgroundColor: vistaActual === 'estudiantes' ? '#3498db' : '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Estudiantes
        </button>
        <button
          onClick={() => setVistaActual('profesores')}
          style={{
            padding: '10px 20px',
            backgroundColor: vistaActual === 'profesores' ? '#3498db' : '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Profesores
        </button>
        <button
          onClick={() => setVistaActual('grupos')}
          style={{
            padding: '10px 20px',
            backgroundColor: vistaActual === 'grupos' ? '#3498db' : '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Grupos
        </button>
        <button
          onClick={() => setVistaActual('asistencias')}
          style={{
            padding: '10px 20px',
            backgroundColor: vistaActual === 'asistencias' ? '#3498db' : '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Asistencias
        </button>
        <button
          onClick={() => setVistaActual('personal')}
          style={{
            padding: '10px 20px',
            backgroundColor: vistaActual === 'personal' ? '#3498db' : '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          RRHH
        </button>
      </div>

      {vistaActual === 'estudiantes' && renderEstudiantes()}
      {vistaActual === 'profesores' && renderProfesores()}
      {vistaActual === 'grupos' && renderGrupos()}
      {vistaActual === 'asistencias' && renderAsistencias()}
      {vistaActual === 'personal' && renderPersonal()}
    </div>
  );
};

export default App;