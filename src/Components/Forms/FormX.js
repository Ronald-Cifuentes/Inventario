import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class FormX extends Component {
    state = {
        id: 0,
        name: '',
        reference: '',
        price: '',
        weight: '',
        category: '',
        stock: '',
        creationdate: '',
        lastsaledate: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitAdd = e => {
        e.preventDefault();
        fetch('http://localhost:3000/crud', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: null,
                name: this.state.name,
                reference: this.state.reference,
                price: this.state.price,
                weight: this.state.weight,
                category: this.state.category,
                stock: this.state.stock,
                creationdate: this.state.creationdate,
                lastsaledate: this.state.lastsaledate
            })
        })
            .then(res => res.json())
            .then(item => {
                this.props.addItemToState(item);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }

    submitEdit = e => {
        e.preventDefault();
        fetch('http://localhost:3000/crud/' + this.state.id, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                reference: this.state.reference,
                price: this.state.price,
                weight: this.state.weight,
                category: this.state.category,
                stock: this.state.stock,
                creationdate: this.state.creationdate,
                lastsaledate: this.state.lastsaledate
            })
        })
            .then(res => res.json())
            .then(item => {
                this.props.editItemFromState(item);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }

    // Ciclo de vida

    componentDidMount() {
        if (this.props.item) {
            const { id, name, reference, price, weight, category, stock, creationdate, lastsaledate } = this.props.item
            this.setState({ id, name, price, reference, weight, category, stock, creationdate, lastsaledate })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitEdit : this.submitAdd}>
                <FormGroup>
                    <Label htmlFor="name">Nombre del producto</Label>
                    <Input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="reference">Referencia</Label>
                    <Input type="text" name="reference" id="reference" onChange={this.handleChange} value={this.state.reference} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="price">Precio</Label>
                    <Input type="text" name="price" id="price" onChange={this.handleChange} value={this.state.price} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="weight">Peso</Label>
                    <Input type="text" name="weight" id="weight" onChange={this.handleChange} value={this.state.weight} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="category">Categoría</Label>
                    <Input type="text" name="category" id="category" onChange={this.handleChange} value={this.state.category} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="stock">Stock</Label>
                    <Input type="text" name="stock" id="stock" onChange={this.handleChange} value={this.state.stock} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="creationdate">Fecha de creación</Label>
                    <Input type="date" name="creationdate" id="creationdate" onChange={this.handleChange} value={this.state.creationdate} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastsaledate">Ultima fecha de venta</Label>
                    <Input type="date" name="lastsaledate" id="lastsaledate" onChange={this.handleChange} value={this.state.lastsaledate} required />
                </FormGroup>
                <Button>Guardar</Button>
            </Form>
        );
    }

}

export default FormX;