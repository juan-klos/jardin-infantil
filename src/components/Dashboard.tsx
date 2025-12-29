import React, { useState } from 'react';
import { estudiantes, profesores, grupos } from '../data/mockData';
import { Estudiante, Profesor, Grupo } from '../types';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'estudiantes' | 'profesores' | 'grupos'>('estudiantes');

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Jardín Infantil - Sistema de Gestión</h1>
      </header>
      
      <nav className="tabs">
        <button 
          className={activeTab === 'estudiantes' ? 'active' : ''}
          onClick={() => setActiveTab('estudiantes')}
        >
          Estudiantes ({estudiantes.length})
        </button>
        <button 
          className={activeTab === 'profesores' ? 'active' : ''}
          onClick={() => setActiveTab('profesores')}
        >
          Profesores ({profesores.length})
        </button>
        <button 
          className={activeTab === 'grupos' ? 'active' : ''}
          onClick={() => setActiveTab('grupos')}
        >
          Grupos ({grupos.length})
        </button>
      </nav>

      <main className="content">
        {activeTab === 'estudiantes' && (
          <div>
            <h2>Lista de Estudiantes</h2>
            <div className="grid">
              {estudiantes.map(estudiante => (
                <div key={estudiante.id} className="card">
                  <h3>{estudiante.nombre} {estudiante.apellido}</h3>
                  <p>Edad: {estudiante.edad} años</p>
                  <p>Grupo: {estudiante.grupo}</p>
                  <p>Contacto: {estudiante.telefonoContacto}</p>
                  {estudiante.alergias && estudiante.alergias.length > 0 && (
                    <p>Alergias: {estudiante.alergias.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profesores' && (
          <div>
            <h2>Lista de Profesores</h2>
            <div className="grid">
              {profesores.map(profesor => (
                <div key={profesor.id} className="card">
                  <h3>{profesor.nombre} {profesor.apellido}</h3>
                  <p>Especialidad: {profesor.especialidad}</p>
                  <p>Email: {profesor.email}</p>
                  <p>Teléfono: {profesor.telefono}</p>
                  <p>Grupos: {profesor.grupos.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'grupos' && (
          <div>
            <h2>Lista de Grupos</h2>
            <div className="grid">
              {grupos.map(grupo => (
                <div key={grupo.id} className="card">
                  <h3>{grupo.nombre}</h3>
                  <p>Edades: {grupo.edadMinima}-{grupo.edadMaxima} años</p>
                  <p>Capacidad: {grupo.estudiantes.length}/{grupo.capacidad}</p>
                  <p>Profesor: {profesores.find(p => p.id === grupo.profesorId)?.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          background: #4CAF50;
          color: white;
          padding: 20px;
          border-radius: 8px;
        }
        
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          justify-content: center;
        }
        
        .tabs button {
          padding: 10px 20px;
          border: none;
          background: #f0f0f0;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .tabs button.active {
          background: #4CAF50;
          color: white;
        }
        
        .tabs button:hover {
          background: #ddd;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .card h3 {
          margin: 0 0 10px 0;
          color: #333;
        }
        
        .card p {
          margin: 5px 0;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;