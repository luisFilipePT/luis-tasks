import React, { Component } from 'react';
import PropTypes from 'prop-types';

// simple loader (not working very well with modals (never used that modals before))

const styles = {
    content: {
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        backgroundColor: 'black',
        opacity: '0.8',
        zIndex: 15000,
        color: 'white',
        textAlign: 'center',
        fontSize: '35px',
    },
};

export class Loader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
        };
    }

    componentDidMount() {
        const stopper = `${this.props.text}...`;
        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState(() => ({ text: this.props.text }));
            } else {
                this.setState(prevState => ({ text: `${prevState.text}.` }));
            }
        }, this.props.speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        );
    }
}

Loader.defaultProps = {
    text: 'Loading',
    speed: 300,
};

Loader.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
};
