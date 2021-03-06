import React, {Component}from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary';
//import axios from 'axios';

const withErrorHandler = (WrappedComponent, axiosInstance) => {

    return class extends Component {
        constructor(){
            super();
            this.state = {
                error: null,
            };
        };

        
        componentDidMount () {
            this.reqInterceptor = axiosInstance.interceptors.request.use(req => {
                this.setState({error: null});
                return req;

            });
            this.respInterceptor = axiosInstance.interceptors.response.use(null, error => {
                this.setState({error: error});
            });
          
        };

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.reqInterceptor);
            axiosInstance.interceptors.response.eject(this.respInterceptor);

        };

        errorConfirmedHandler = () => {
            this.setState({error: null});
        };
        render () {
            return (    <Aux>
                <Modal show = {this.state.error}
                modalClosed = {this.errorConfirmedHandler}>
                {this.state.error? this.state.error.message : null}>
                    Something went very wrong!!!
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>);
        };

    }; 
};

export default  withErrorHandler;