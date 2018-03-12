import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RenameListModal extends Component {
    static propTypes = {
        updateAction: PropTypes.func.isRequired,
        handleClose: PropTypes.func.isRequired,
        list: PropTypes.object.isRequired,
        message: PropTypes.string,
    };

    static defaultProps = {
        message: 'Rename List',
    };

    constructor(props) {
        super(props);
        const funcsToBind = [
            'update',
            'handleChange',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });

        this.state = { title: this.props.list.title };
    }

    handleChange({ target }) {
        const { name, value } = target;
        this.setState({
            [name]: value,
        });
    }

    update() {
        const { updateAction, list, handleClose, token } = this.props;
        updateAction({ ...list, title: this.state.title }, token, handleClose);
    }

    render() {
        const { message } = this.props;
        const { title } = this.state;

        return (
            <div className="row">
                <div className="u-margin-bottom-small">
                    <h2 className="heading-secondary">
                        { message }
                    </h2>
                </div>
                <form action="#" className="form">
                    <div className="form__group">
                        <input
                            required
                            id="title"
                            className="form__input"
                            name="title"
                            value={title}
                            placeholder="Title"
                            type="text"
                            onChange={this.handleChange}/>
                        <label htmlFor="title" className="form__label">Title</label>
                    </div>
                </form>
                <div className="form__actions">
                    <button className="btn btn--white" onClick={this.props.handleClose}>Cancel</button>
                    <button className="btn btn--green" onClick={this.update}>Save</button>
                </div>
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

export default connect(mapStateToProps)(RenameListModal);
