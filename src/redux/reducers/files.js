export default function files(state = {newFile: null, loading: false}, action) {
    switch (action.type) {
        case 'UPLOAD_FILE_LOADING':
        return {...state,
            loading: true
        };
        // case 'UPLOAD_FILE':
        // return {...state,
        //     newFile: action.file,
        //     loading: false,
        // };
        case 'UPLOAD_FILE_FAILED':
        return {...state,
            newFile: null,
            loading:false
        };
        default:
            return state;
    }
}