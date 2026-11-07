import { useState } from 'react';
import Button from '../components/button';

export default function CrearProducto({ onAgregarProducto }) {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoArticulo = {
      Codigo: codigo,
      Descripcion: descripcion,
      Precio_Venta: precioVenta,
      Ubicacion: ubicacion,
      Proveedor: proveedor,
      Precio_Compra: precioCompra
    };

    if (onAgregarProducto) {
      onAgregarProducto(nuevoArticulo);
    }

    alert('¡Artículo creado localmente con éxito!');
    // Limpiar campos
    setCodigo('');
    setDescripcion('');
    setPrecioVenta('');
    setUbicacion('');
    setProveedor('');
    setPrecioCompra('');
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Código del Artículo</label>
          <input 
            type="text" 
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)} 
            placeholder="Ej. ART-001"
            required 
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Nombre o detalle del artículo"
            required 
          />
        </div>
        <div className="form-group">
          <label>Precio de Venta</label>
          <input 
            type="number" 
            value={precioVenta} 
            onChange={(e) => setPrecioVenta(e.target.value)} 
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
          <label>Proveedor (Llave Foránea - Código)</label>
          <input 
            type="text" 
            value={proveedor} 
            onChange={(e) => setProveedor(e.target.value)} 
            placeholder="Código del proveedor"
            required 
          />
        </div>
        <div className="form-group">
          <label>Precio de Compra</label>
          <input 
            type="number" 
            value={precioCompra} 
            onChange={(e) => setPrecioCompra(e.target.value)} 
            placeholder="0.00"
          />
        </div>
        <Button type="submit">Guardar Producto</Button>
      </form>
    </div>
  );
}