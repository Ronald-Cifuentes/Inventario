import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import FormX from '../Forms/FormX'

class ModalX extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState( prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        const closeBtn = <button className="close" onClick={ this.toggle } >&times;</button>

        const label = this.props.buttonLabel

        let button = ''
        let title = ''

        if (label === 'Add') {
            button = <Button
                        color = "success"
                        onClick = { this.toggle }
                        style = {{ float: "left", marginRight:"10px" }}>{ label }
                    </Button>
            title = 'Add Item'
        } else {
            button = <Button
                        color = "primary"
                        onClick = { this.toggle }
                        style = {{float: "left", marginRight: "10px"}}> { label }
                    </Button>
            title = 'Edd item'
        }

        return(
            <div>
                { button }
                <Modal isOpen = { this.state.modal } toggle = { this.toggle } className = { this.props.className } >
                    <ModalHeader toggle = { this.toggle } close = { closeBtn } >{ title }</ModalHeader>
                    <ModalBody>
                        <FormX 
                            addItemToState = { this.props.addItemToState }
                            editItemFromState = { this.props.editItemFromState }
                            toggle = { this.toggle }
                            item = { this.props.item }/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

export default ModalX