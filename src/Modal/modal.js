import React from 'react';
import './modal.css';


export default class Modal extends React.Component {
    state = {
        isOpen: false,
    };

    render() {
        return(
            <React.Fragment>
                <button onClick={() => this.setState({isOpen: true})}>Open modal</button><br /><br />

                {this.state.isOpen && (<div className='modal'>
                    <div className='modal-body'>
                        <h1>Hello!</h1>
                        <p>This is modal!</p>
                        <button onClick={() => this.setState({isOpen: false})}>Close</button>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}