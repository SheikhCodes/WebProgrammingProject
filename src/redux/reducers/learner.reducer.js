import { LEARNER_SIGN_IN, LEARNER_SIGN_UP, LEARNER_SIGN_OUT,GET_LEARNER,GET_USER_ERROR,GET_ALL_COURSES } from "../actionTypes/learner.actionType";

const initialState = {
    learner : ''
}

const learnerReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LEARNER_SIGN_UP:
            const learnerSignUpJS = JSON.stringify(payload.data.accessToken)
            localStorage.setItem('user',JSON.stringify('learner'))
            localStorage.setItem('token',learnerSignUpJS)
            return {...state, learner: payload.data}
        case LEARNER_SIGN_IN:
            const learnerSignInJS = JSON.stringify(payload.data.accessToken)
            localStorage.setItem('user',JSON.stringify('learner'))
            localStorage.setItem('token',learnerSignInJS)
            return {...state, learner: payload.data}
        case LEARNER_SIGN_OUT:
            localStorage.clear()
            return {...state, learner: ''}
        case GET_LEARNER:
            return {...state, learner: payload.data}
        case GET_USER_ERROR:
            return {...state, learner: ''}
        case GET_ALL_COURSES:
            return {...state,courses: payload.data}
        default:
            return state;
    }
}

export default learnerReducer;