import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../Support/API_URL';

class Transaction extends Component {
    state = {
        loading : true,
        data : [],
        showModal : false,
        renderModal : []
    }

    componentDidMount(){
        let token = localStorage.getItem('token')
        let userInfo = JSON.parse(token)
        this.fetchTransaction(userInfo.id)
    }

    fetchTransaction = (id) => {
        Axios.get(`${API_URL}/transaction?userId=${id}`)
        .then((res) => {
            this.setState({
                data : res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderTableTransaction = () => {
        let nomor = 1;
        return this.state.data.map((val,id) => {
            return(
                <tr key={val.id}>
                    <td>{`${nomor++}`}</td>
                    <td>{val.date}</td>
                    <td>
                        {val.product.slice(0,1).map((val,index) => {
                            return <img src={val.image} alt={index.toString()} width='20%'/>
                        })}
                    </td>
                    <td>
                        {val.product.slice(0,1).map((val) => {
                            return <p>{val.name}</p>
                        })}
                    </td>
                    <td>{val.grandTotal}</td>
                    <td>
                        <Button onClick={() => this.handleClick(id)}>
                            Transaction Detail
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    handleClick = (id) => {
        this.transDetail(id)
        this.setState({
            showModal : true
        })
    }

    transDetail = (id) => {
        let no = 1
        let arr = this.state.data[id].product.map((val,index) => {
            return(
                <tr>
                    <td>{no++}</td>
                    <td><img src={val.image} alt={index.toString()} width='10%'/></td>
                    <td>{val.name}</td>
                    <td>{val.size}</td>
                    <td>{val.price}</td>
                    <td>{val.qty}</td>
                    <td>{val.total}</td>
                </tr>
            )
        })
        this.setState({
            renderModal : arr
        })
    }

    render(){
        return(
            <div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Date</th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableTransaction()}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Modal isOpen={this.state.showModal}>
                        <ModalHeader>Transaction Detail</ModalHeader>
                        <ModalBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.renderModal}
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='secondary' onClick={() => this.setState({ showModal : false })}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transaction : state.transactions.transactionList,
        userID : state.auth.id,
        cart : state.cart.cartList
    }
}

export default connect(mapStateToProps)(Transaction);