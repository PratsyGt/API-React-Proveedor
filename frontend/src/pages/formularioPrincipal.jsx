export default function FormularioPrincipal({ productos, cargando }) {
  return (
    <div>
      <div className="header">
        <h1>Productos del Sistema</h1>
      </div>
      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos registrados en el backend.</p>
      ) : (
        <div className="products-grid">
          {productos.map((p) => (
            <div className="product-card" key={p.id || p._id}>
              <h3>{p.nombre}</h3>
              <div className="price">${p.precio}</div>
              <p>{p.descripcion || 'Sin descripción'}</p>
              <small style={{ color: '#8892b0', marginTop: '10px', display: 'block' }}>
                ID: {p.id || p._id}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}