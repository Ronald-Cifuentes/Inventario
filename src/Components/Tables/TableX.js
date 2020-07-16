import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import ModalX from '../Modals/ModalX'

class TableX extends Component {

    
    deleteItem = id => {
        let corfirmDelete = window.confirm('Seguro que desea eliminar este elemento?')
        if (corfirmDelete) {
            fetch('http://localhost:3000/crud/' + id, {
                method: 'delete',
                headers: { 'Content-Type': 'aplication/json' },
            })
            .then( res => res.json() )
            .then( item => this.props.deleteItemFromState(id) )
            .then( err => console.log(err) )
        }
    }

    render() {
        const items = this.props.items.map( item => {
            return(
                <tr key={ item.id }>
                    <th scope="row">{ item.id }</th>
                    <td>{ item.name }</td>
                    <td>{ item.reference }</td>
                    <td>{ item.price }</td>
                    <td>{ item.weight }</td>
                    <td>{ item.category }</td>
                    <td>{ item.stock }</td>
                    <td>{ item.creationdate }</td>
                    <td>{ item.lastsaledate }</td>
                    <td>
                        <div style = {{ width:"110px" }}>
                            <ModalX buttonLabel = "Edit" item = { item } editItemFromState = { this.props.editItemFromState }/>
                            <Button color = "danger" onClick = { () => this.deleteItem(item.id) } >Del</Button>
                        </div>
                    </td>
                </tr>
            );
        });

        return(
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del producto</th>
                        <th>Referencia</th>
                        <th>Precio</th>
                        <th>Peso</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Fecha de creación</th>
                        <th>Fecha última venta</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { items }
                </tbody>
            </Table>
        );
    }
}

export default TableX