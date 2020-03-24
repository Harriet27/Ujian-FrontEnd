import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';
import Swal from 'sweetalert2';

export const cartProduct = (id) => {
    return(dispatch) => {
        Axios.get(`${API_URL}/cart?userID=${id}`)
        .then((res) => {
            dispatch({
                type: 'LOAD_CART',
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const pushCartProduct = (obj) => {
    return(dispatch) => {
        Axios.post(`${API_URL}/cart`, obj)
        .then((res) => {
            Swal.fire(
                'Added to Cart',
                'Refresh Page 1x, Thx :)'
            )
            dispatch({
                type: 'LOAD_CART'
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const deleteCartProduct = (id,img) => {
    return(dispatch) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            imageUrl: img,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/cart/${id}`)
                .then((res) => {
                    console.log(res)
                    Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'Success!'
                    )
                    Axios.get(`${API_URL}/cart`)
                    .then((res) => {
                        dispatch({
                            type: 'LOAD_CART',
                            payload: res.data
                        })
                    })
                    .catch((err) => {
                        dispatch({
                            type: 'FETCH_DATA_FAILED'
                        })
                    })
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}