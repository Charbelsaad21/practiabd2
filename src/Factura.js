import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Label } from "reactstrap"


const data = [
  {num_fac:"001", rif_cliente: "Rif001", fecha_emision: "12-10-2004", tipo_pago: "F", tipo_moneda: "B" },

];

class Factura extends React.Component {
  state = {
    data: data,
    form: {
      num_fac: '',
      rif_cliente: '',
      fecha_emision: '',
      tipo_pago: '',
      tipo_moneda: '',
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

  redireccionarAClientes = () => {
    this.props.history.push('/');
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
      if (dato.num_fac === registro.num_fac) {
        registro.rif_cliente = dato.rif_cliente;
        registro.fecha_emision = dato.fecha_emision;
        registro.tipo_pago = dato.tipo_pago;
        registro.tipo_moneda = dato.tipo_moneda;
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
          <Button className="position-absolute top-0 end-0 m-3"color='primary' onClick={() => this.mostrarmodalInsertar()}>insertar nueva Factura </Button>
          <Button color='primary' onClick={this.redireccionarAClientes}>Clientes</Button>
          <Button color='danger'onClick>Facturas</Button>
          <br /><br />
          

          <Table>
            <thead>
              <tr>
                <th>num factura</th>
                <th>rif Cliente</th>
                <th>fecha_emision</th>
                <th>tipo_pago</th>
                <th>tipo_moneda</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.num_fac}>
                  <td>{elemento.num_fac}</td>
                  <td>{elemento.rif_cliente}</td>
                  <td>{elemento.fecha_emision}</td>
                  <td>{elemento.tipo_pago}</td>
                  <td>{elemento.tipo_moneda}</td>
                  <td><Button  color='primary'  onClick={() => this.mostrarmodalEditar(elemento)} >Editar</Button>
                      <Button color='danger'onClick={() => this.eliminar(elemento)}>Eliminar</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.ModalInsertar}>
          <ModalHeader>
            <div>
              <h3> insertar Factura</h3>
            </div>
          </ModalHeader>

          <ModalBody>
              <FormGroup>
                  <Label>Numero de Factura</Label>
                  <input className=' form-control' name="num_fac" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>Rif Cliente</Label>
                  <input className=' form-control'  name="rif_cliente" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>fecha emision</Label>
                  <input className=' form-control' name="Fecha_emision" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>tipo pago</Label>
                  <input className=' form-control' name="tipo_pago" type='text' onChange={this.handlechange}/>
              </FormGroup>
              <FormGroup>
                  <Label>tipo moneda</Label>
                  <input className=' form-control' name="tipo_moneda" type='text' onChange={this.handlechange}/>
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
              <h3> Editar factura</h3>
            </div>
          </ModalHeader>

          <ModalBody>
              <FormGroup>
                  <Label>num factura</Label>
                  <input className=' form-control' readOnly type='text' value={this.state.form.num_fac}/>
              </FormGroup>
              <FormGroup>
                  <Label>rif cliente</Label>
                  <input className=' form-control'  readOnly type='text'  value={this.state.form.rif_cliente}/>
              </FormGroup>
              <FormGroup>
                  <Label>fecha emision</Label>
                  <input className=' form-control' name="fecha_emision" type='text' onChange={this.handlechange}  value={this.state.form.fecha_emision}/>
              </FormGroup>
              <FormGroup>
                  <Label>tipo pago</Label>
                  <input className=' form-control' name="tipo_pago" type='text' onChange={this.handlechange}  value={this.state.form.tipo_pago}/>
              </FormGroup>
              <FormGroup>
                  <Label>tipo moneda</Label>
                  <input className=' form-control' name="tipo_moneda" type='text' onChange={this.handlechange}  value={this.state.form.tipo_moneda}/>
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

export default Factura;
