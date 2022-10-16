import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl="http://localhost/crud-react/";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [ClientesSeleccionado, setClientesSeleccionado]=useState({
    id_cliente: '',
    Tipo_Documento: '',
    N_Documento: '',
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Fecha_Nacimiento: '',
    Pais: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setClientesSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(ClientesSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("Tipo_Documento", ClientesSeleccionado.Tipo_Documento);
    f.append("N_Documento", ClientesSeleccionado.N_Documento);
    f.append("Nombre", ClientesSeleccionado.Nombre);
    f.append("Apellido", ClientesSeleccionado.Apellido);
    f.append("Direccion", ClientesSeleccionado.Direccion);
    f.append("Fecha_Nacimiento", ClientesSeleccionado.Fecha_Nacimiento);
    f.append("Pais", ClientesSeleccionado.Pais);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("Tipo_Documento", ClientesSeleccionado.Tipo_Documento);
    f.append("N_Documento", ClientesSeleccionado.N_Documento);
    f.append("Nombre", ClientesSeleccionado.Nombre);
    f.append("Apellido", ClientesSeleccionado.Apellido);
    f.append("Direccion", ClientesSeleccionado.Direccion);
    f.append("Fecha_Nacimiento", ClientesSeleccionado.Fecha_Nacimiento);
    f.append("Pais", ClientesSeleccionado.Pais);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id_cliente: ClientesSeleccionado.id_cliente}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(Clientes=>{
        if(Clientes.id_cliente===ClientesSeleccionado.id_cliente){
          Clientes.Tipo_Documento=ClientesSeleccionado.Tipo_Documento;
          Clientes.N_Documento=ClientesSeleccionado.N_Documento;
          Clientes.Nombre=ClientesSeleccionado.Nombre;
          Clientes.Apellido=ClientesSeleccionado.Apellido;
          Clientes.Direccion=ClientesSeleccionado.Direccion;
          Clientes.Fecha_Nacimiento=ClientesSeleccionado.Fecha_Nacimiento;
          Clientes.Pais=ClientesSeleccionado.Pais;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id_cliente: ClientesSeleccionado.id_cliente}})
    .then(response=>{
      setData(data.filter(Cliente=>Cliente.id_cliente!==ClientesSeleccionado.id_cliente));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarCliente=(Cliente, caso)=>{
    setClientesSeleccionado(Cliente);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <h1>Lista de Clientes</h1>
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Agregar Cliente</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo de Documento</th>
          <th>N° de Documento</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Direccion</th>
          <th>Fecha de Nacimiento</th>
          <th>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(Clientes=>(
          <tr key={Clientes.id_cliente}>
            <td>{Clientes.id_cliente}</td>
            <td>{Clientes.Tipo_Documento}</td>
            <td>{Clientes.N_Documento}</td>
            <td>{Clientes.Nombre}</td>
            <td>{Clientes.Apellido}</td>
            <td>{Clientes.Direccion}</td>
            <td>{Clientes.Fecha_Nacimiento}</td>
            <td>{Clientes.Pais}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarCliente(Clientes, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarCliente(Clientes, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Agregar Cliente</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Tipo de Documento: </label>
          <br />
          <select className="form-control" name="Tipo_Documento" onChange={handleChange}>
                <option selected hidden value="">Seleccione</option>
                <option value="dni">DNI</option>
                <option value="pasaporte">PASAPORTE</option>
          </select>
          <br />
          <label>N° de Documento: </label>
          <br />
          <input type="text" className="form-control" name="N_Documento" onChange={handleChange}/>
          <br />
          <label>Nombres: </label>
          <br />
          <input type="text" className="form-control" name="Nombre" onChange={handleChange}/>
          <br />
          <label>Apellidos: </label>
          <br />
          <input type="text" className="form-control" name="Apellido" onChange={handleChange}/>
          <br />
          <label>Direccion: </label>
          <br />
          <input type="text" className="form-control" name="Direccion" onChange={handleChange}/>
          <br />
          <label>Fecha de Nacimiento: </label>
          <br />
          <input type="date" className="form-control" name="Fecha_Nacimiento" min="1957-01-01" onChange={handleChange}/>
          <br />
          <label>Pais de Residencia: </label>
          <br />
          <select class="form-control" name="Pais" onChange={handleChange}>
                  <option selected hidden value="">Seleccione</option>
                  <option value="PERU">PERU</option>
                  <option value="BRASIL">BRASIL</option>
                  <option value="COLOMBIA">COLOMBIA</option>
                  <option value="CHILE">CHILE</option>
                  <option value="ARGENTINA">ARGENTINA</option>
          </select>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Agregar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Cliente</ModalHeader>
      <ModalBody>
      <div className="form-group">
          <label>Tipo de Documento: </label>
          <br />
          <select className="form-control" name="Tipo_Documento" onChange={handleChange} value={ClientesSeleccionado && ClientesSeleccionado.Tipo_Documento}>
                <option selected hidden value="">Seleccione</option>
                <option value="dni">DNI</option>
                <option value="pasaporte">PASAPORTE</option>
          </select>
          <br />
          <label>N° de Documento: </label>
          <br />
          <input type="text" className="form-control" name="N_Documento" onChange={handleChange} value={ClientesSeleccionado && ClientesSeleccionado.N_Documento}/>
          <br />
          <label>Nombres: </label>
          <br />
          <input type="text" className="form-control" name="Nombre" onChange={handleChange} value={ClientesSeleccionado && ClientesSeleccionado.Nombre}/>
          <br />
          <label>Apellidos: </label>
          <br />
          <input type="text" className="form-control" name="Apellido" onChange={handleChange} value={ClientesSeleccionado && ClientesSeleccionado.Apellido}/>
          <br />
          <label>Direccion: </label>
          <br />
          <input type="text" className="form-control" name="Direccion" onChange={handleChange} value={ClientesSeleccionado && ClientesSeleccionado.Direccion}/>
          <br />
          <label>Fecha de Nacimiento: </label>
          <br />
          <input type="date" className="form-control" name="Fecha_Nacimiento" min="1957-01-01" onChange={handleChange} value={ClientesSeleccionado && ClientesSeleccionado.Fecha_Nacimiento}/>
          <br />
          <label>Pais de Residencia: </label>
          <br />
          <select class="form-control" name="Pais" onChange={handleChange} value={ClientesSeleccionado && ClientesSeleccionado.Pais}>
                  <option selected hidden value="">Seleccione</option>
                  <option value="PERU">PERU</option>
                  <option value="BRASIL">BRASIL</option>
                  <option value="COLOMBIA">COLOMBIA</option>
                  <option value="CHILE">CHILE</option>
                  <option value="ARGENTINA">ARGENTINA</option>
          </select>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Cliente {ClientesSeleccionado && ClientesSeleccionado.Nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );

}
export default App;
