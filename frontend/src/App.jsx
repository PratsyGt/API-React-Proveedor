import { useState } from 'react';
import FormularioPrincipal from './pages/formularioPrincipal';
import CrearProducto from './pages/crearProducto';
import ActualizarProducto from './pages/actualizarProducto';
import EliminarProducto from './pages/eliminarProducto';
import './App.css';

export default function App() {
  const [vistaActual, setVistaActual] = useState('productos');
  const [articulos, setArticulos] = useState([
    // Un par de artículos de prueba iniciales para que los veas en la lista
    { Codigo: 'ART-001', Descripcion: 'Teclado Mecánico', Precio_Venta: '350.00', Ubicacion: 'Pasillo 1', Proveedor: 'PROV-01', Precio_Compra: '200.00' },
    { Codigo: 'ART-002', Descripcion: 'Mouse Gamer', Precio_Venta: '180.00', Ubicacion: 'Pasillo 2', Proveedor: 'PROV-02', Precio_Compra: '100.00' }
  ]);

  // Función para agregar artículo
  const handleAgregarArticulo = (nuevoArticulo) => {
    setArticulos([...articulos, nuevoArticulo]);
  };

  // Función para eliminar artículo por código
  const handleEliminarArticulo = (codigo) => {
    const nuevosArticulos = articulos.filter(art => art.Codigo !== codigo);
    setArticulos(nuevosArticulos);
  };

  return (
    <div className="layout">
      {/* Barra Lateral estilo IA */}
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
          <CrearProducto onAgregarProducto={handleAgregarArticulo} />
        )}
        
        {vistaActual === 'actualizar' && (
          <ActualizarProducto />
        )}
        
        {vistaActual === 'eliminar' && (
          <EliminarProducto articulos={articulos} onEliminarArticulo={handleEliminarArticulo} />
        )}
      </main>
    </div>
  );
}