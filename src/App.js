// importamos las librerias necesarias para el programa
import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {

  // Estado para almacenar la cédula
  const [cedula,setCedula] = useState("");
  // Estado para almacenar la nombre
  const [nombre,setNombre] = useState("");
  // Estado para almacenar la apellido
  const [apellido,setApellido] = useState("");
  // Estado para almacenar la correo
  const [correo,setCorreo] = useState("");
  // Estado para almacenar la telefono
  const [telefono,setTelefono] = useState("");
  // Estado para almacenar la Id
  const [idClientes,setIdClientes] = useState(0);
  // Estado para almacenar edicion de cliente
  const [editar,setEditar] = useState(false);
  // Estado para almacenar la lista de clientes
  const [clientesList,setClientes] = useState([]);

  const add = ()=>{
    // Realiza una solicitud POST al servidor en la ruta "http://localhost:3001/create"
    Axios.post("http://localhost:3001/create",{
      cedula:cedula, // Envía el valor de la cédula
      nombre:nombre, // Envía el valor del nombre
      apellido:apellido, // Envía el valor del apellido
      correo:correo, // Envía el valor del correo
      telefono:telefono // Envía el valor de la telefono
    }).then(()=>{
      // Después de que se complete la solicitud, realiza las siguientes acciones:
      getClientes(); // Actualiza la lista de clientes
      limpiarCampos(); // Limpia los campos de entrada
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i>El cliente <strong>"+nombre+"</strong> fue registrado con éxito!!!</i>",
        icon: 'success',
        timer:3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    }); // Muestra una notificación de éxito utilizando SweetAlert
  }

  const update = ()=>{
    // Realiza una solicitud POST al servidor en la ruta "http://localhost:3001/update"
    Axios.put("http://localhost:3001/update",{
      idClientes:idClientes, // Envía el valor de IdClientes
      cedula:cedula, // Envía el valor de la cédula
      nombre:nombre, // Envía el valor del nombre
      apellido:apellido, // Envía el valor del apellido
      correo:correo, // Envía el valor del correo
      telefono:telefono // Envía el valor del telefono
    }).then(()=>{
      // Después de que se complete la solicitud, realiza las siguientes acciones:
      getClientes(); // Actualiza la lista de clientes
      limpiarCampos(); // Limpia los campos de entrada
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>El cliente <strong>"+nombre+"</strong> fue actualizado con éxito!!!</i>",
        icon: 'success',
        timer:3000
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        })
      }); // Muestra una notificación de éxito utilizando SweetAlert
    });
  }

  const deleteCliente = (val)=>{
    // Muestra una ventana emergente de confirmación
    Swal.fire({
      title: 'Confirmar eliminado?',
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      // Después de que se complete la solicitud, realiza las siguientes acciones:
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.idClientes}`).then((res)=>{
          getClientes(); // Actualiza la lista de clientes
          limpiarCampos(); // Limpia los campos de entrada 
          Swal.fire({
            icon: 'success',
            title: val.nombre+' fue eliminado.',
            showConfirmButton: false,
            timer: 2000
          });
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el cliente!',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          })
        }); // Muestra una notificación de éxito utilizando SweetAlert
        
      }
    });

    
  }

  const limpiarCampos = ()=>{
    // Limpia los valores de los estados
    setCedula("");
    setNombre("");
    setApellido("");
    setCorreo("");
    setTelefono("");
    setIdClientes("");
    setEditar(false); // Establece "editar" como falso
  }

    const editarCliente = (val)=>{
      // Establece "editar" como verdadero
      setEditar(true);
      // Establece los valores de los estados con los datos del cliente proporcionados
      setCedula(val.cedula);
      setNombre(val.nombre);
      setApellido(val.apellido);
      setCorreo(val.correo);
      setTelefono(val.telefono);
    }
  

  const getClientes = ()=>{
    // Realiza una solicitud GET al servidor en la ruta "http://localhost:3001/clientes"
    Axios.get("http://localhost:3001/clientes").then((response)=>{
      // Después de recibir la respuesta, actualiza el estado "clientes" con los datos obtenidos
      setClientes(response.data);
    });
  }

  getClientes();

  return (
    <div className="container">

    <div className="card text-center">
      <div className="card-header">
        GESTIÓN DE CLIENTES
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cedula:</span>
          <input type="text"
          onChange={(event)=>{
            // Actualiza el estado "cedula" cuando cambia el valor del campo de entrada
            setCedula(event.target.value);
          }}
          className="form-control" value={cedula} placeholder="Ingrese una cedula" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" value={nombre}
           onChange={(event)=>{
            // Actualiza el estado "nombre" cuando cambia el valor del campo de entrada
            setNombre(event.target.value);
          }}
          className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Apellido:</span>
          <input type="text" value={apellido}
           onChange={(event)=>{
            // Actualiza el estado "apellido" cuando cambia el valor del campo de entrada
            setApellido(event.target.value);
          }}
          className="form-control" placeholder="Ingrese un apellido" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Correo:</span>
          <input type="text" value={correo}
           onChange={(event)=>{
            // Actualiza el estado "correo" cuando cambia el valor del campo de entrada
            setCorreo(event.target.value);
          }}
          className="form-control" placeholder="Ingrese un correo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
      

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Telefono:</span>
          <input type="text" value={telefono}
           onChange={(event)=>{
            // Actualiza el estado "telefono" cuando cambia el valor del campo de entrada
            setTelefono(event.target.value);
          }}
          className="form-control" placeholder="Ingrese el telefono" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

      </div>
      <div className="card-footer text-muted">
        {
          editar? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
          <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
          :<button className='btn btn-success' onClick={add}>Registrar</button>
        }
      
      </div>
    </div>
    <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">idClientes</th>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Correo</th>
          <th scope="col">Telefono</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

      {
          clientesList.map((val,key)=>{
            return <tr key={val.idClientes}>
                    <th>{val.idClientes}</th>
                    <td>{val.cedula}</td>
                    <td>{val.nombre}</td>
                    <td>{val.apellido}</td>
                    <td>{val.correo}</td>
                    <td>{val.telefono}</td>
                    <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      onClick={()=>{
                        editarCliente(val);
                      }}
                      className="btn btn-info">Editar</button>
                      <button type="button" onClick={()=>{
                        deleteCliente(val);
                      }} className="btn btn-danger">Eliminar</button>
                    </div>
                    </td>
                  </tr>
            
          })
        }
        
        
      </tbody>  
    </table>


    </div>
  );
}

export default App;