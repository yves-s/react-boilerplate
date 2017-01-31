import * as home from './actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case home.EXMAMPLE_REDUCER:
            return state;
        default:
            return state;
    }
}