import {
    EXERCISE_DONE_LIST_REQUEST,
    EXERCISE_DONE_LIST_SUCCESS,
    EXERCISE_DONE_LIST_FAIL,

    MUSCLE_LIST_REQUEST,
    MUSCLE_LIST_SUCCESS,
    MUSCLE_LIST_FAIL,

    EXERCISE_DONE_DETAILS_REQUEST,
    EXERCISE_DONE_DETAILS_SUCCESS,
    EXERCISE_DONE_DETAILS_FAIL,

    EXERCISE_DONE_DELETE_REQUEST,
    EXERCISE_DONE_DELETE_SUCCESS,
    EXERCISE_DONE_DELETE_FAIL,

    EXERCISE_DONE_CREATE_REQUEST,
    EXERCISE_DONE_CREATE_SUCCESS,
    EXERCISE_DONE_CREATE_FAIL,
    EXERCISE_DONE_CREATE_RESET,

    SERIE_CREATE_REQUEST,
    SERIE_CREATE_SUCCESS,
    SERIE_CREATE_FAIL,

    SERIE_DETAILS_REQUEST,
    SERIE_DETAILS_SUCCESS,
    SERIE_DETAILS_FAIL,

    ARTICULATION_RESULTS_DETAILS_REQUEST,
    ARTICULATION_RESULTS_DETAILS_SUCCESS,
    ARTICULATION_RESULTS_DETAILS_FAIL,

    ARTICULATION_CREATE_REQUEST,
    ARTICULATION_CREATE_SUCCESS,
    ARTICULATION_CREATE_FAIL,

    ARTICULATION_DETAILS_REQUEST,
    ARTICULATION_DETAILS_SUCCESS,
    ARTICULATION_DETAILS_FAIL,

    EXERCISE_DONE_UPDATE_REQUEST,
    EXERCISE_DONE_UPDATE_SUCCESS,
    EXERCISE_DONE_UPDATE_FAIL,
    EXERCISE_DONE_UPDATE_RESET,

    EXERCISE_DONE_CREATE_REVIEW_REQUEST,
    EXERCISE_DONE_CREATE_REVIEW_SUCCESS,
    EXERCISE_DONE_CREATE_REVIEW_FAIL,
    EXERCISE_DONE_CREATE_REVIEW_RESET,

    EXERCISE_DONE_TOP_REQUEST,
    EXERCISE_DONE_TOP_SUCCESS,
    EXERCISE_DONE_TOP_FAIL,

    EXERCISE_DONE_SAVE_DATA,
    EXERCISE_DONE_SAVE_INDICATIONS,
    EXERCISE_DONE_SAVE_RESULTS,

    FEED_BODYBUILDER_REQUEST,
    FEED_BODYBUILDER_SUCCESS,
    FEED_BODYBUILDER_FAIL,

    FEED_PERSONAL_REQUEST,
    FEED_PERSONAL_SUCCESS,
    FEED_PERSONAL_FAIL
} from '../constants/exerciseDoneConstants'


export const exerciseListReducer = (state = { exercises: [] }, action) => {
    switch (action.type) {
        case EXERCISE_DONE_LIST_REQUEST:
            return { loading: true, exercises: [] }

        case EXERCISE_DONE_LIST_SUCCESS:
            return {
                loading: false,
                exercises: action.payload.exercises,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case EXERCISE_DONE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const exerciseDetailsReducer = (state = { exercise: { reviews: [] } }, action) => {
    switch (action.type) {
        case EXERCISE_DONE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case EXERCISE_DONE_DETAILS_SUCCESS:
            return { loading: false, exercise: action.payload }

        case EXERCISE_DONE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const exerciseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case EXERCISE_DONE_DELETE_REQUEST:
            return { loading: true }

        case EXERCISE_DONE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case EXERCISE_DONE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const exerciseDoneCreateReducer = (state = {exerciseDone: [],  serie: [],  articulation: []}, action) => {
    switch (action.type) {
        case EXERCISE_DONE_CREATE_REQUEST:
            return { loading: true }

        case EXERCISE_DONE_CREATE_SUCCESS:
            return {
                ...state,
                successExerciseDone: true,
                exerciseDone: action.payload
            }
        
        case SERIE_CREATE_SUCCESS:
            return {
                ...state,
                successSerie: true,
                serie: action.payload
            }

        case ARTICULATION_CREATE_SUCCESS:
            return {
                ...state,
                successArticulation: true,
                articulation: action.payload
            }

        case EXERCISE_DONE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case EXERCISE_DONE_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const articulationDetailsReducer = (state = { articulations:  []  }, action) => {
    switch (action.type) {
        case ARTICULATION_DETAILS_REQUEST:
            return { loading: true, ...state }

        case ARTICULATION_DETAILS_SUCCESS:
            return { loading: false,  articulations: action.payload }

        case ARTICULATION_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const serieDetailsReducer = (state = { serie: [] }, action) => {
    switch (action.type) {
        case SERIE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case SERIE_DETAILS_SUCCESS:
            return { loading: false, serie: action.payload }

        case SERIE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const articulationsDetailsReducer = (state = { articulations: [] }, action) => {
    switch (action.type) {
        case ARTICULATION_RESULTS_DETAILS_REQUEST:
            return { loading: true, ...state }

        case ARTICULATION_RESULTS_DETAILS_SUCCESS:
            return { loading: false, articulations: action.payload }

        case ARTICULATION_RESULTS_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const feedBodybuilderReducer = (state = { feed: [] }, action) => {
    switch (action.type) {
        case FEED_BODYBUILDER_REQUEST:
            return { loading: true, feed: [] }

        case FEED_BODYBUILDER_SUCCESS:
            return {
                loading: false, feed: action.payload
            }

        case FEED_BODYBUILDER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const feedPersonalReducer = (state = { feed: [] }, action) => {
    switch (action.type) {
        case FEED_PERSONAL_REQUEST:
            return { loading: true, feed: [] }

        case FEED_PERSONAL_SUCCESS:
            return {
                loading: false, feed: action.payload
            }

        case FEED_PERSONAL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}