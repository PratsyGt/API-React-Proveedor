import { useState, useEffect } from 'react';
import Button from '../components/button';

export default function ActualizarProducto() {
  const [articulosList, setArticulosList] = useState([]);
  const [proveedoresList, setProveedoresList] = useState([]);
  
  const [codigoSeleccionado, setCodigoSeleccionado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [proveedorId, setProveedorId] = useState('');

  // Cargar artículos y proveedores al montar
  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/articulos/')
      .then(res => res.json())
      .then(data => setArticulosList(data))
      .catch(err => console.error('Error al cargar artículos:', err));

    fetch('http://127.0.0.1:8001/api/proveedores/')
      .then(res => res.json())
      .then(data => setProveedoresList(data))
      .catch(err => console.error('Error al cargar proveedores:', err));
  }, []);

  // Cuando el usuario selecciona un artículo de la lista, rellenamos el formulario
  const handleSelectChange = (e) => {
    const cod = e.target.value;
    setCodigoSeleccionado(cod);

    const artEncontrado = articulosList.find(a => String(a.codigo) === String(cod));
    if (artEncontrado) {
      setDescripcion(artEncontrado.descripcion);
      setPrecioVenta(artEncontrado.precio_venta);
      setPrecioCompra(artEncontrado.precio_compra);
      setUbicacion(artEncontrado.ubicacion || '');
      setProveedorId(typeof artEncontrado.proveedor === 'object' ? artEncontrado.proveedor.codigo : artEncontrado.proveedor);
    } else {
      setDescripcion('');
      setPrecioVenta('');
      setPrecioCompra('');
      setUbicacion('');
      setProveedorId('');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!codigoSeleccionado) {
      alert('Por favor seleccione un artículo.');
      return;
    }

    const articuloActualizado = {
      descripcion,
      precio_venta: parseFloat(precioVenta),
      precio_compra: parseFloat(precioCompra),
      ubicacion,
      proveedor: parseInt(proveedorId)
    };

    try {
      const res = await fetch(`http://127.0.0.1:8001/api/articulos/${codigoSeleccionado}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articuloActualizado),
      });

      if (res.ok) {
        alert(`¡Artículo ${codigoSeleccionado} actualizado correctamente!`);
      } else {
        alert('Error al actualizar el artículo.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Actualizar Artículo</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Seleccionar Artículo a Modificar *</label>
          <select 
            value={codigoSeleccionado} 
            onChange={handleSelectChange} 
            required
            style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', padding: '12px', borderRadius: '6px' }}
          >
            <option value="">-- Seleccione un artículo --</option>
            {articulosList.map((art) => (
              <option key={art.codigo} value={art.codigo}>
                [{art.codigo}] {art.descripcion}
              </option>
            ))}
          </select>
        </div>

        {codigoSeleccionado && (
          <>
            <div className="form-group">
              <label>Descripción *</label>
              <input 
                type="text" 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
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
                required 
              />
            </div>
            <div className="form-group">
              <label>Ubicación</label>
              <input 
                type="text" 
                value={ubicacion} 
                onChange={(e) => setUbicacion(e.target.value)} 
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
            <Button type="submit">Guardar Cambios</Button>
          </>
        )}
      </form>
    </div>
  );
}