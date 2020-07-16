import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import TableX from '../Tables/TableX'
import ModalX from '../Modals/ModalX'
import './App.css'
import Swal from 'sweetalert2'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            items:[]
        }
    }

    async getItems() {
        await fetch('http://localhost:3000/crud')
                .then( res => res.json() )
                .then( data => this.setState({ items: data }) )
                .catch(
                    err => {
                        console.log(err)
                        this.AlertError('read')
                    }
                )
    }

    
    
    addItemToState = (item) => {
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
        this.AlertSusses('add')
    }

    editItemFromState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        console.log(item.id)
        console.log(itemIndex)
        this.setState({
            items: [
                ...this.state.items.slice(0, itemIndex),
                item,
                ...this.state.items.slice(itemIndex + 1)
            ]
        })
        this.AlertSusses('edit')
    }

    deleteItemFromState = (id) => {
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
        this.AlertSusses('delete')
    }

    componentDidMount() {
        this.getItems();
    }
    
    render() {
        return (
            <Container className="container">
                <Row>
                    <Col>
                        <h1 style={{ margin: "20px 0",textAlign: "center" }}>Inventario</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TableX items={ this.state.items } deleteItemFromState = { this.deleteItemFromState } editItemFromState = { this.editItemFromState } />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ModalX buttonLabel= "Add" addItemToState={ this.addItemToState } />
                    </Col>
                </Row>
            </Container>
        )
    }

    AlertSusses = (type) => {
        let msg = ''
        switch (type) {
            case 'read':
                msg = 'leido'
                break;
            case 'add':
                msg = 'agregado'
                break;
            case 'edit':
                msg = 'editado'
                break;
            case 'delete':
                msg = 'eliminado'
                break;
        }
        Swal.fire({
            title: 'Exelente',
            type: 'success',
            text: 'Se ha ' + msg + ' correctamente.'
        })
    }

    AlertError = (type) => {
        let msg = ''
        switch (type) {
            case 'read':
                msg = 'leer los elementos.'
                break;
            case 'add':
                msg = 'agregar el elemento.'
                break;
            case 'edit':
                msg = 'editar el elemento.'
                break;
            case 'delete':
                msg = 'eliminar el elemento.'
                break;
        }
        Swal.fire({
            title: 'Error',
            type: 'error',
            text: 'No se ha podido ' + msg
        })
    }
}

export default App;
