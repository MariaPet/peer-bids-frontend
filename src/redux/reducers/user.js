export default function user(state = {currentUser: null, loading: false}, action) {
    switch (action.type) {
        case 'REGISTER':
            return {...state,
                currentUser: action.user,
                loading: false
            }
        case 'LOGIN':
            return {...state,
                currentUser: action.user,
                loading: false
            }
        case 'AUTHENTICATION_FAILED':
            return {...state,
                currentUser: null,
                loading: false,
            }
        case 'AUTHENTICATION_LOADING':
            return {...state,
                loading: true
            }
        case 'LOG_OUT':
            return {...state,
                currentUser: null,
                loading: false,
                token: null
            }
        case 'REFRESH_TOKEN':
            return {...state,
                currentUser: action.user,
                loading: false
            }
        default:
            return state;
    }
}