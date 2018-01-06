export default function user(state = {currentUser: null, loading: false, errorMessage: null, successMessage:null}, action) {
    switch (action.type) {
        case 'REGISTER':
            return {...state,
                currentUser: action.user,
                loading: false,
                errorMessage: null,
                successMessage: action.message
            }
        case 'LOGIN':
            return {...state,
                currentUser: action.user,
                loading: false,
                errorMessage: null,
                successMessage: null
            }
        case 'LOGIN_ERROR':
        return {...state,
            errorMessage: action.message,
            successMessage: null
        }
        case 'AUTHENTICATION_FAILED':
            return {...state,
                currentUser: null,
                loading: false,
                successMessage: null
            }
        case 'AUTHENTICATION_LOADING':
            return {...state,
                loading: true
            }
        case 'LOG_OUT':
            return {...state,
                currentUser: null,
                loading: false,
                token: null,
                successMessage: null
            }
        case 'REFRESH_TOKEN':
            return {...state,
                currentUser: action.user,
                loading: false,
                successMessage: null
            }
        case 'PROFILE_IMG_UPDATE':
        var updatedUser = {...state.currentUser}
        updatedUser["profileImg"] = action.url
        return {
            ...state,
            currentUser: updatedUser,
            successMessage: null
        }
        default:
            return state;
    }
}