import { useState, useEffect } from 'react';
import Button from '../components/button';

export default function EliminarProducto() {
  const [articulosList, setArticulosList] = useState([]);
  const [codigoSeleccionado, setCodigoSeleccionado] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/articulos/')
      .then(res => res.json())
      .then(data => setArticulosList(data))
      .catch(err => console.error('Error al cargar artículos:', err));
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!codigoSeleccionado) {
      alert('Por favor seleccione un artículo para eliminar.');
      return;
    }

    if (!window.confirm(`¿Estás seguro de eliminar el artículo con código ${codigoSeleccionado}?`)) {
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8001/api/articulos/${codigoSeleccionado}/`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert(`¡Artículo ${codigoSeleccionado} eliminado con éxito!`);
        // Actualizar la lista local quitando el eliminado
        setArticulosList(articulosList.filter(art => String(art.codigo) !== String(codigoSeleccionado)));
        setCodigoSeleccionado('');
      } else {
        alert('No se pudo eliminar el artículo (puede estar protegido por relaciones).');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Eliminar Producto</h2>
      <form onSubmit={handleDelete}>
        <div className="form-group">
          <label>Seleccionar Artículo a Eliminar *</label>
          <select 
            value={codigoSeleccionado} 
            onChange={(e) => setCodigoSeleccionado(e.target.value)} 
            required
            style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', padding: '12px', borderRadius: '6px' }}
          >
            <option value="">-- Seleccione un artículo --</option>
            {articulosList.map((art) => (
              <option key={art.codigo} value={art.codigo}>
                [{art.codigo}] {art.descripcion} - Venta: Q{art.precio_venta}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="danger">Eliminar Definitivamente</Button>
      </form>
    </div>
  );
}