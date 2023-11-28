import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Label } from "reactstrap"

const data = [
  {rif_cliente:"Rif001", cedula: 28384964, nombre_c: "Charbel", direccion_c: "ALta vista", telefono: "04145869874" , statusc: "C", fecha_afi: "30-12-2002", fecha_desa: "31-01-2005", email: "charbelsaad@hotmail.com"},
  {rif_cliente:"Rif002", cedula: 25384964, nombre_c: "luis", direccion_c: "san felix", telefono: "0414526874" , statusc: "A", fecha_afi: "30-12-2002", fecha_desa: "31-01-2005", email: "luisgonzalez@hotmail.com"}

];

class Clientes extends React.Component {
  state = {
    data: data,
    form: {
      id: '',
      cedula: '',
      nombre_c: '',
      direccion_c: '',
      telefono: '',
      statusc: '',
      fecha_afi: '',
      fecha_desa: '',
      email: '',
    },
    ModalInsertar: false,
    ModalEditar : false,
  };

  handlechange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarmodalInsertar = () => {
    this.setState({ ModalInsertar: true })
  }

  Insertar = () => {
    var valueNuevo={...this.state.form};
    var lista=this.state.data;
    lista.push(valueNuevo);
    this.setState({data: lista, ModalInsertar : false})
  }

  ocultarmodalInsertarinsertar = () => {
    this.setState({ ModalInsertar: false })
  }


  mostrarmodalEditar = (registro) => {
    this.setState({ ModalEditar: true, form: registro })
  }

  ocultarmodalEditar = () => {
    this.setState({ ModalEditar: false })
  }

  eliminar = (dato) => {
    var opcion = window.confirm("¿Quieres eliminarlo?");
    if (opcion) {
      const listaFiltrada = this.state.data.filter((registro) => registro.rif_cliente !== dato.rif_cliente);
      this.setState({ data: listaFiltrada });
    }
  };
  editar = (dato) => {
    var lista = this.state.data.map((registro) => {
      if (dato.rif_cliente === registro.rif_cliente) {
        registro.cedula = dato.cedula;
        registro.nombre_c = dato.nombre_c;
        registro.direccion_c = dato.direccion_c;
        registro.telefono = dato.telefono;
        registro.statusc = dato.statusc;
        registro.fecha_afi = dato.fecha_afi;
        registro.fecha_desa = dato.fecha_desa;
        registro.email = dato.email;
      }
      return registro;
    });
  
    this.setState({ data: lista, ModalEditar: false });
  }
  render() {
    return (
      <>
        <Container>
          <br />
          <Button  className="position-absolute top-0 end-0 m-3 "color='primary' onClick={() => this.mostrarmodalInsertar()}>insertar nuevo Cliente</Button>
          <Button color='primary'  onClick>Clientes</Button>
          <Button color='danger'onClick>Facturas</Button>
          <br /><br />

          <Table>
            <thead>
              <tr>
                <th>rif</th>
                <th>cedula</th>
                <th>nombre_c</th>
                <th>direccion_c</th>
                <th>telefono</th>
                <th>statusc</th>
                <th>fecha_afi</th>
                <th>fecha_desa</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.rif_cliente}>
                  <td>{elemento.rif_cliente}</td>
                  <td>{elemento.cedula}</td>
                  <td>{elemento.nombre_c}</td>
                  <td>{elemento.direccion_c}</td>
                  <td>{elemento.telefono}</td>
                  <td>{elemento.statusc}</td>
                  <td>{elemento.fecha_afi}</td>
                  <td>{elemento.fecha_desa}</td>
                  <td>{elemento.email}</td>
                  <td><Button color='primary'  onClick={() => this.mostrarmodalEditar(elemento)} >Editar</Button>
                      <Button color='danger'onClick={() => this.eliminar(elemento)}>Eliminar</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.ModalInsertar}>
          <ModalHeader>
            <div className='custom-button'>
              <h3> insertar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
              <FormGroup>
                  <Label>rif</Label>
                  <input className=' form-control' name="rif_cliente" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>cedula</Label>
                  <input className=' form-control'  name="cedula" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>nombre</Label>
                  <input className=' form-control' name="nombre_c" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>direccion</Label>
                  <input className=' form-control' name="direccion_c" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>telefono</Label>
                  <input className=' form-control' name="telefono" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>statusc</Label>
                  <input className=' form-control' name="statusc" type='text'onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>fecha_afi</Label>
                  <input className=' form-control' name="fecha_afi" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>fecha_desa</Label>
                  <input className=' form-control' name="fecha_desa" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>email</Label>
                  <input className=' form-control' name="email" type='text' onChange={this.handlechange}/>
              </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <Button color="primary" onClick={() => this.Insertar()}>Insertar</Button>
            <Button color="danger" onClick={() => this.ocultarmodalInsertarinsertar()}>Cancelar</Button>
          </ModalFooter>


        </Modal>

        <Modal isOpen={this.state.ModalEditar}>
          <ModalHeader>
            <div>
              <h3> Editar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
              <FormGroup>
                  <Label>rif</Label>
                  <input className=' form-control' readOnly type='text' value={this.state.form.rif_cliente}/>
              </FormGroup>
              <FormGroup>
                  <Label>cedula</Label>
                  <input className=' form-control'  readOnly type='text'  value={this.state.form.cedula}/>
              </FormGroup>
              <FormGroup>
                  <Label>nombre</Label>
                  <input className=' form-control' name="nombre_c" type='text' onChange={this.handlechange}  value={this.state.form.nombre_c}/>
              </FormGroup>
              <FormGroup>
                  <Label>direccion</Label>
                  <input className=' form-control' name="direccion_c" type='text' onChange={this.handlechange}  value={this.state.form.direccion_c}/>
              </FormGroup>
              <FormGroup>
                  <Label>telefono</Label>
                  <input className=' form-control' name="telefono" type='text' onChange={this.handlechange}  value={this.state.form.telefono}/>
              </FormGroup>
              <FormGroup>
                  <Label>statusc</Label>
                  <input className=' form-control' name="statusc" type='text'onChange={this.handlechange}  value={this.state.form.statusc}/>
              </FormGroup>
              <FormGroup>
                  <Label>fecha_afi</Label>
                  <input className=' form-control' name="fecha_afi" type='text' onChange={this.handlechange} value={this.state.form.fecha_afi}/>
              </FormGroup>
              <FormGroup>
                  <Label>fecha_desa</Label>
                  <input className=' form-control' name="fecha_desa" type='text' onChange={this.handlechange} value={this.state.form.fecha_afi}/>
              </FormGroup>
              <FormGroup>
                  <Label>email</Label>
                  <input className=' form-control' name="email" type='text' onChange={this.handlechange} value={this.state.form.email}/>
              </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color="danger"  onClick={() => this.ocultarmodalEditar()}>Cancelar</Button>
          </ModalFooter>


        </Modal>

















      </>
    )
  }
}

export default Clientes;
