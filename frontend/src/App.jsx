import { useState } from 'react';
import FormularioPrincipal from './pages/formularioPrincipal';
import CrearProducto from './pages/crearProducto';
import ActualizarProducto from './pages/actualizarProducto';
import EliminarProducto from './pages/eliminarProducto';
import CrearProveedor from './pages/crearProveedor'; // <--- Importar la vista de proveedor
import './App.css';

export default function App() {
  const [vistaActual, setVistaActual] = useState('productos');
  const [articulos, setArticulos] = useState([]);

  return (
    <div className="layout">
      {/* Barra Lateral estilo Stark System */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-title">STARK SYSTEM</div>
          <nav className="sidebar-menu">
            <button 
              className={`btn-sidebar ${vistaActual === 'productos' ? 'active' : ''}`}
              onClick={() => setVistaActual('productos')}
            >
              📦 Ver Productos
            </button>
            <button 
              className={`btn-sidebar ${vistaActual === 'crear' ? 'active' : ''}`}
              onClick={() => setVistaActual('crear')}
            >
              ➕ Crear Producto
            </button>
            <button 
              className={`btn-sidebar ${vistaActual === 'crear-proveedor' ? 'active' : ''}`}
              onClick={() => setVistaActual('crear-proveedor')}
            >
              🏢 Crear Proveedor
            </button>
            <button 
              className={`btn-sidebar ${vistaActual === 'actualizar' ? 'active' : ''}`}
              onClick={() => setVistaActual('actualizar')}
            >
              ✏️ Actualizar Producto
            </button>
            <button 
              className={`btn-sidebar ${vistaActual === 'eliminar' ? 'active' : ''}`}
              onClick={() => setVistaActual('eliminar')}
            >
              🗑️ Eliminar Producto
            </button>
          </nav>
        </div>
      </aside>

      {/* Contenido Dinámico */}
      <main className="main-content">
        {vistaActual === 'productos' && (
          <FormularioPrincipal productos={articulos} cargando={false} />
        )}
        
        {vistaActual === 'crear' && (
          <CrearProducto />
        )}

        {vistaActual === 'crear-proveedor' && (
          <CrearProveedor />
        )}
        
        {vistaActual === 'actualizar' && (
          <ActualizarProducto />
        )}
        
        {vistaActual === 'eliminar' && (
          <EliminarProducto articulos={articulos} />
        )}
      </main>
    </div>
  );
}