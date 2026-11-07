import { useState, useEffect } from 'react';

export default function FormularioPrincipal() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/articulos/')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al cargar artículos:', err);
        setCargando(false);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Catálogo de Artículos</h1>
      </div>
      {cargando ? (
        <p>Cargando datos desde el servidor...</p>
      ) : productos.length === 0 ? (
        <p>No hay artículos registrados en la base de datos.</p>
      ) : (
        <div className="products-grid">
          {productos.map((p) => (
            <div className="product-card" key={p.codigo}>
              <h3>{p.descripcion}</h3>
              <div className="price">Precio Venta: Q{p.precio_venta}</div>
              <p>Precio Compra: Q{p.precio_compra}</p>
              <p>Ubicación: {p.ubicacion || 'N/A'}</p>
              <p>ID Proveedor: {typeof p.proveedor === 'object' ? p.proveedor.nombre : p.proveedor}</p>
              <small style={{ color: 'var(--text-h)', display: 'block', marginTop: '8px' }}>
                Código (ID): {p.codigo}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}