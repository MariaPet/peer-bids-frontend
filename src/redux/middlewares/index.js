// export const logger = store => next => action =>  {
//     next(action);
// }

//second middleware
export const crashReporter = store => next => action => {
    try {
        next(action);
    } catch(err) {
        console.group('crashReporter');
        console.error('error happen with action == ', action);
        console.error(err);
        console.groupEnd('crashReporter');
    }
}

//third middleware
//TODO document
// export const thunk = store => next => action => {
//     if(typeof action === 'function') {
//         action(store.dispatch, store.getState());
//     }
//     else {
//         next(action);
//     }
// }