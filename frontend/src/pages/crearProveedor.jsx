import { useState } from 'react';
import Button from '../components/button';

export default function CrearProveedor() {
  const [nombre, setNombre] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [poblacion, setPoblacion] = useState('');
  const [cpostal, setCpostal] = useState('');
  const [provincia, setProvincia] = useState('');
  const [tfno, setTfno] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProveedor = {
      nombre,
      domicilio,
      poblacion,
      cpostal,
      provincia,
      tfno,
      email
    };

    try {
      const res = await fetch('http://127.0.0.1:8001/api/proveedores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProveedor),
      });

      if (res.ok) {
        alert('¡Proveedor creado con éxito!');
        setNombre('');
        setDomicilio('');
        setPoblacion('');
        setCpostal('');
        setProvincia('');
        setTfno('');
        setEmail('');
      } else {
        alert('Error al crear el proveedor.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Proveedor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre *</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Nombre de la empresa o proveedor"
            required 
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input 
            type="text" 
            value={tfno} 
            onChange={(e) => setTfno(e.target.value)} 
            placeholder="Ej. 55554444"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="proveedor@ejemplo.com"
          />
        </div>
        <div className="form-group">
          <label>Domicilio</label>
          <input 
            type="text" 
            value={domicilio} 
            onChange={(e) => setDomicilio(e.target.value)} 
            placeholder="Dirección fiscal"
          />
        </div>
        <div className="form-group">
          <label>Población</label>
          <input 
            type="text" 
            value={poblacion} 
            onChange={(e) => setPoblacion(e.target.value)} 
            placeholder="Municipio o ciudad"
          />
        </div>
        <div className="form-group">
          <label>Código Postal</label>
          <input 
            type="text" 
            value={cpostal} 
            onChange={(e) => setCpostal(e.target.value)} 
            placeholder="01001"
          />
        </div>
        <div className="form-group">
          <label>Provincia / Departamento</label>
          <input 
            type="text" 
            value={provincia} 
            onChange={(e) => setProvincia(e.target.value)} 
            placeholder="Provincia / Departamento"
          />
        </div>
        <Button type="submit">Guardar Proveedor</Button>
      </form>
    </div>
  );
}