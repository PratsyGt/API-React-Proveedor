import { useState } from 'react';
import Button from '../components/button';

export default function ActualizarProducto() {
  const [codigoArticulo, setCodigoArticulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Simulación local sin backend por ahora
    alert(`¡Artículo ${codigoArticulo} actualizado localmente con éxito!`);
    
    // Limpiar campos
    setCodigoArticulo('');
    setDescripcion('');
    setPrecioVenta('');
    setUbicacion('');
    setProveedor('');
    setPrecioCompra('');
  };

  return (
    <div className="form-container">
      <h2>Actualizar Artículo</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Código del Artículo a Actualizar</label>
          <input 
            type="text" 
            value={codigoArticulo} 
            onChange={(e) => setCodigoArticulo(e.target.value)} 
            placeholder="Ingrese el código existente"
            required 
          />
        </div>
        <div className="form-group">
          <label>Nueva Descripción</label>
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Detalle del artículo"
          />
        </div>
        <div className="form-group">
          <label>Nuevo Precio Venta</label>
          <input 
            type="number" 
            value={precioVenta} 
            onChange={(e) => setPrecioVenta(e.target.value)} 
            placeholder="0.00"
          />
        </div>
        <div className="form-group">
          <label>Nueva Ubicación</label>
          <input 
            type="text" 
            value={ubicacion} 
            onChange={(e) => setUbicacion(e.target.value)} 
            placeholder="Pasillo / Bodega"
          />
        </div>
        <div className="form-group">
          <label>Nuevo Proveedor (Llave Foránea)</label>
          <input 
            type="text" 
            value={proveedor} 
            onChange={(e) => setProveedor(e.target.value)} 
            placeholder="Código del proveedor"
          />
        </div>
        <div className="form-group">
          <label>Nuevo Precio Compra</label>
          <input 
            type="number" 
            value={precioCompra} 
            onChange={(e) => setPrecioCompra(e.target.value)} 
            placeholder="0.00"
          />
        </div>
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </div>
  );
}