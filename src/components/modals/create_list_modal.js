import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CreateListModal extends Component {
    static propTypes = {
        createAction: PropTypes.func.isRequired,
        handleClose: PropTypes.func.isRequired,
        message: PropTypes.string,
    };

    static defaultProps = {
        message: 'Create List',
    };

    constructor(props) {
        super(props);
        const funcsToBind = [
            'handleSave',
            'handleChange',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });

        this.state = { title: '' };
    }

    handleChange({ target }) {
        const { name, value } = target;
        this.setState({
            [name]: value,
        });
    }

    handleSave() {
        const { createAction, handleClose, token } = this.props;
        createAction(this.state.title, token, handleClose);
    }

    render() {
        const { message } = this.props;
        const { title } = this.state;

        return (
            <div>
                <h1>Create List</h1>
                <h4>{message}</h4>
                <input type="text" value={title} onChange={this.handleChange} name="title"/>
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.props.handleClose}>Cancel</button>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    const { token } = auth;

    return {
        token,
    };
}

export default connect(mapStateToProps)(CreateListModal);
