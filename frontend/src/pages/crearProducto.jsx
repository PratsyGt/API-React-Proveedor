import { useState, useEffect } from 'react';
import Button from '../components/button';

export default function CrearProducto() {
  const [descripcion, setDescripcion] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [proveedoresList, setProveedoresList] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/proveedores/')
      .then(res => res.json())
      .then(data => setProveedoresList(data))
      .catch(err => console.error('Error al cargar proveedores:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoArticulo = {
      descripcion,
      precio_venta: parseFloat(precioVenta),
      precio_compra: parseFloat(precioCompra),
      ubicacion,
      proveedor: parseInt(proveedorId)
    };

    try {
      const res = await fetch('http://127.0.0.1:8001/api/articulos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoArticulo),
      });

      if (res.ok) {
        alert('¡Artículo guardado en la base de datos con éxito!');
        setDescripcion('');
        setPrecioVenta('');
        setPrecioCompra('');
        setUbicacion('');
        setProveedorId('');
      } else {
        alert('Error al guardar el artículo. Revisa los datos ingresados.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Descripción *</label>
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Descripción del artículo"
            required 
          />
        </div>
        <div className="form-group">
          <label>Precio de Venta *</label>
          <input 
            type="number" 
            step="0.01"
            value={precioVenta} 
            onChange={(e) => setPrecioVenta(e.target.value)} 
            placeholder="0.00"
            required 
          />
        </div>
        <div className="form-group">
          <label>Precio de Compra *</label>
          <input 
            type="number" 
            step="0.01"
            value={precioCompra} 
            onChange={(e) => setPrecioCompra(e.target.value)} 
            placeholder="0.00"
            required 
          />
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input 
            type="text" 
            value={ubicacion} 
            onChange={(e) => setUbicacion(e.target.value)} 
            placeholder="Pasillo / Bodega"
          />
        </div>
        <div className="form-group">
          <label>Proveedor *</label>
          <select 
            value={proveedorId} 
            onChange={(e) => setProveedorId(e.target.value)} 
            required
            style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', padding: '12px', borderRadius: '6px' }}
          >
            <option value="">-- Seleccione un proveedor --</option>
            {proveedoresList.map((p) => (
              <option key={p.codigo} value={p.codigo}>
                {p.codigo} - {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">Guardar Producto</Button>
      </form>
    </div>
  );
}