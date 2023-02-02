import {
    EXERCISE_LIST_REQUEST,
    EXERCISE_LIST_SUCCESS,
    EXERCISE_LIST_FAIL,

    MUSCLE_LIST_REQUEST,
    MUSCLE_LIST_SUCCESS,
    MUSCLE_LIST_FAIL,

    EXERCISE_DETAILS_REQUEST,
    EXERCISE_DETAILS_SUCCESS,
    EXERCISE_DETAILS_FAIL,

    EXERCISE_DELETE_REQUEST,
    EXERCISE_DELETE_SUCCESS,
    EXERCISE_DELETE_FAIL,

    EXERCISE_CREATE_REQUEST,
    EXERCISE_CREATE_SUCCESS,
    EXERCISE_CREATE_FAIL,
    EXERCISE_CREATE_RESET,

    EXERCISE_UPDATE_REQUEST,
    EXERCISE_UPDATE_SUCCESS,
    EXERCISE_UPDATE_FAIL,
    EXERCISE_UPDATE_RESET,

    EXERCISE_CREATE_REVIEW_REQUEST,
    EXERCISE_CREATE_REVIEW_SUCCESS,
    EXERCISE_CREATE_REVIEW_FAIL,
    EXERCISE_CREATE_REVIEW_RESET,

    EXERCISE_TOP_REQUEST,
    EXERCISE_TOP_SUCCESS,
    EXERCISE_TOP_FAIL,

    EXERCISE_SAVE_DATA,
    EXERCISE_SAVE_INDICATIONS,
    EXERCISE_SAVE_RESULTS
} from '../constants/exerciseConstants'


export const exerciseListReducer = (state = { exercises: [] }, action) => {
    switch (action.type) {
        case EXERCISE_LIST_REQUEST:
            return { loading: true, exercises: [] }

        case EXERCISE_LIST_SUCCESS:
            return {
                loading: false,
                exercises: action.payload.exercises,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case EXERCISE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const exerciseDetailsReducer = (state = { exercise: { reviews: [] } }, action) => {
    switch (action.type) {
        case EXERCISE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case EXERCISE_DETAILS_SUCCESS:
            return { loading: false, exercise: action.payload }

        case EXERCISE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const exerciseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case EXERCISE_DELETE_REQUEST:
            return { loading: true }

        case EXERCISE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case EXERCISE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const exerciseCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case EXERCISE_CREATE_REQUEST:
            return { loading: true }

        case EXERCISE_CREATE_SUCCESS:
            return { loading: false, success: true, exercise: action.payload }

        case EXERCISE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case EXERCISE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const exerciseUpdateReducer = (state = { exercise: {} }, action) => {
    switch (action.type) {
        case EXERCISE_UPDATE_REQUEST:
            return { loading: true }

        case EXERCISE_UPDATE_SUCCESS:
            return { loading: false, success: true, exercise: action.payload }

        case EXERCISE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case EXERCISE_UPDATE_RESET:
            return { exercise: {} }

        default:
            return state
    }
}



export const exerciseReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case EXERCISE_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case EXERCISE_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case EXERCISE_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case EXERCISE_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}


export const exerciseTopRatedReducer = (state = { exercises: [] }, action) => {
    switch (action.type) {
        case EXERCISE_TOP_REQUEST:
            return { loading: true, exercises: [] }

        case EXERCISE_TOP_SUCCESS:
            return { loading: false, exercises: action.payload, }

        case EXERCISE_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const muscleListReducer = (state = { muscles: [] }, action) => {
    switch (action.type) {
        case MUSCLE_LIST_REQUEST:
            return { loading: true, muscles: [] }

        case MUSCLE_LIST_SUCCESS:
            return {loading: false, muscles: action.payload.muscles, }

        case MUSCLE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const exerciseReducer = (state = { exerciseData: {}, exerciseIndications: {} }, action) => {
    switch (action.type) {

        case EXERCISE_SAVE_DATA:
            return {
                ...state,
                exerciseData: action.payload
            }

        case EXERCISE_SAVE_INDICATIONS:
            return {
                ...state,
                exerciseIndications: action.payload
            }

        case EXERCISE_SAVE_RESULTS:
            return {
                ...state,
                exerciseResults: action.payload
            }

        default:
            return state
    }
}