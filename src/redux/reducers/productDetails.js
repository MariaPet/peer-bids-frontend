export default function product(state = {product: null, loading: false}, action) {
    switch (action.type) {
        case 'GET_PRODUCT':
        return {...state,
            product: action.product,
            loading: false
        };
        case 'PRODUCT_LOADING':
        return {...state,
            loading: true
        };
        case 'PRODUCT_LOADING_FAILED':
        return {...state,
            product: null,
            loading:false
        };
        default:
            return state;
    }
}