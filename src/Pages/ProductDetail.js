import React, { Component } from 'react';
// import Axios from 'axios';
// import { API_URL } from '../Support/API_URL';
import { Button } from 'reactstrap';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import { fetchDataById, pushCartProduct, cartProduct } from '../Redux/Action';
import { connect } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class ProductDetail extends Component {
    state = { 
        data : {},
        sizes : [
            { value: '36', label: '36' },
            { value: '37', label: '37' },
            { value: '38', label: '38' },
            { value: '39', label: '39' },
            { value: '40', label: '40' },
            { value: '41', label: '41' },
            { value: '42', label: '42' },
            { value: '43', label: '43' },
            { value: '44', label: '44' },
            { value: '45', label: '45' }
        ],
        qty : [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
        ],
        selectedSize : 38,
        selectedQty : 1
    }

    componentDidMount(){
        let id = this.props.location.search.split('=')[1]
        this.props.fetchDataById(id)
    }

    addToCart = () => {
        let { data } = this.props
        let userID = this.props.userID
        let name = data.name
        let productID = data.id
        let price = data.price
        let image = data.image
        let size = this.state.selectedSize
        let qty = this.state.selectedQty
        let total = data.price * qty
        let obj = {
            qty,
            userID,
            name,
            productID,
            price,
            total,
            image,
            size
        }
        this.props.pushCartProduct(obj);
        this.props.cartProduct();
    }

    render(){
        if (this.props.loading) {
            return(
                <div className='loader'>
                    <center>
                        <Loader type='Bars' color='#somecolor' height={80} width={80}/>
                    </center>
                </div>
            )
        }
        if (this.props.error) {
            return(
                <div>
                    <center>
                        {this.props.error}
                    </center>
                </div>
            )
        }
        let { data } = this.props;
        if(this.props.loading){
            return(
                <div style={{height : '100vh'}}>
                    loading
                </div>
            )
        }
        return ( 
            <div className='row mr-0'>
                <div className='col-4 d-flex justify-content-center'>
                    {
                        data.image
                        ?
                        <img src={data.image} alt='sepatu' width='300px' height='220px'/>
                        :
                        <Loader type="Circles" color="#5A6268" height={80} width={80}/>
                    }
                </div>
                <div className='col-8 container'>
                    <div className='py-1'>
                        <h3>
                            {data.name}
                        </h3>
                    </div>
                    <div className='py-1'>
                        <h4>
                            {data.brand}
                        </h4>
                    </div>
                    <div className='py-1'>
                        <h5>
                            {data.category}
                        </h5>
                    </div>
                    <div className='py-1'>
                        <h1>
                            {
                                data.price
                                ?
                                <h5>
                                    Rp.{data.price.toLocaleString()}
                                </h5>
                                :
                                null
                            }
                        </h1>
                    </div>
                    <div className='py-1'>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>
                    </div>
                    <div className='py-1' style={{marginRight:'70%'}} ref='size'>
                        <Select options={this.state.sizes} onChage={(e) => this.setState({selectedSize:e.value})} placeholder='Choose Size'/>
                    </div>
                    <div className='py-1' style={{marginRight:'70%'}} ref='qty'>
                        <Select options={this.state.qty} onChage={(e) => this.setState({selectedQty:e.value})} placeholder='Choose Quantity'/>
                    </div>
                    <div style={{float:'left'}}>
                        <Button color='primary' onClick={() => this.addToCart()}>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        data : state.product.productById,
        loading : state.product.loading,
        error : state.product.error,
        userID : state.auth.id
    }
}

export default connect(mapStatetoProps, { fetchDataById, pushCartProduct, cartProduct })(ProductDetail);