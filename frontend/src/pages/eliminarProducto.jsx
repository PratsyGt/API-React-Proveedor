import { useState } from 'react';
import Button from '../components/button';

export default function EliminarProducto({ articulos, onEliminarArticulo }) {
  const [codigoArticulo, setCodigoArticulo] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    
    // Verificamos si el artículo existe en la lista local
    const existe = articulos.some(art => art.Codigo === codigoArticulo);

    if (!existe && articulos.length > 0) {
      alert(`No se encontró ningún artículo con el código: ${codigoArticulo}`);
      return;
    }

    if (onEliminarArticulo) {
      onEliminarArticulo(codigoArticulo);
    }

    alert(`¡Artículo ${codigoArticulo} eliminado con éxito!`);
    setCodigoArticulo('');
  };

  return (
    <div className="form-container">
      <h2>Eliminar Producto</h2>
      <form onSubmit={handleDelete}>
        <div className="form-group">
          <label>Código del Artículo a Eliminar</label>
          <input 
            type="text" 
            value={codigoArticulo} 
            onChange={(e) => setCodigoArticulo(e.target.value)} 
            placeholder="Ingrese el código del artículo"
            required 
          />
        </div>
        <Button type="submit" variant="danger">Eliminar Definitivamente</Button>
      </form>
    </div>
  );
}