import React, { Component } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');

export default function (WrappedComponent) {
    class WithModal extends Component {
        constructor(props) {
            super(props);
            const funcsToBind = [
                'renderModal',
                'handleOpenModal',
                'handleCloseModal',
            ];
            funcsToBind.forEach((f) => {
                this[f] = this[f].bind(this);
            });

            this.state = {
                showModal: false,
            };
        }

        handleOpenModal() {
            this.setState({ showModal: true });
        }

        handleCloseModal() {
            this.setState({ showModal: false });
        }

        renderModal(content) {
            return (
                <ReactModal
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            zIndex: 100,
                        },
                        content: {
                            backgroundColor: 'whitesmoke',
                            padding: '4rem',
                            paddingBottom: '2rem',
                            width: '75rem',
                            height: 'auto',
                            display: 'table',
                            margin: '0 auto',
                        },
                    }}
                    isOpen={this.state.showModal}>
                    <button onClick={this.handleCloseModal} className="btn-modal-close"><i className="fas fa-times-circle"/></button>
                    {content}
                </ReactModal>
            );
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    renderModal={this.renderModal}
                    handleOpenModal={this.handleOpenModal}
                    handleCloseModal={this.handleCloseModal}/>
            );
        }
    }

    return WithModal;
}
