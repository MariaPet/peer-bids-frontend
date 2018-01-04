export default function apiData(state = {data: [], loading: "Get data from the API"}, action) {
    switch (action.type) {
        case 'DATA':
            return {...state, 
                data: action.data,
                loading: "loaded"
            };
        case 'DATA_LOADING':
            return {...state, 
                loading: "loading"
            };
        default:
            return state;
    }
};