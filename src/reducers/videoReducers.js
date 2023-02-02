//servirá para o personal e bodybuilder
import axios from 'axios'
import {
    VIDEO_INCIALIZE_BODYBUILDER_REQUEST,
    VIDEO_INCIALIZE_BODYBUILDER_SUCCESS,
    VIDEO_INCIALIZE_BODYBUILDER_FAIL,

    VIDEO_INCIALIZE_PERSONAL_REQUEST,
    VIDEO_INCIALIZE_PERSONAL_SUCCESS,
    VIDEO_INCIALIZE_PERSONAL_FAIL,

    VIDEO_HUMANPOINTS_BODYBUILDER_REQUEST,
    VIDEO_HUMANPOINTS_BODYBUILDER_SUCCESS,
    VIDEO_HUMANPOINTS_BODYBUILDER_FAIL,

    VIDEO_HUMANPOINTS_PERSONAL_REQUEST,
    VIDEO_HUMANPOINTS_PERSONAL_SUCCESS,
    VIDEO_HUMANPOINTS_PERSONAL_FAIL,

    VIDEO_STOP_BODYBUILDER_REQUEST,
    VIDEO_STOP_BODYBUILDER_SUCCESS,
    VIDEO_STOP_BODYBUILDER_FAIL,

    VIDEO_STOP_PERSONAL_REQUEST,
    VIDEO_STOP_PERSONAL_SUCCESS0,
    VIDEO_STOP_PERSONAL_SUCCESS1,
    VIDEO_STOP_PERSONAL_SUCCESS2,
    VIDEO_STOP_PERSONAL_FAIL

} from '../constants/videoConstants'

export const videoInicializeBodybuilderReducer = (state = { video: []}, action) => {
    switch (action.type) {
        case VIDEO_INCIALIZE_BODYBUILDER_REQUEST:
            return { loading: true, ...state }

        case VIDEO_INCIALIZE_BODYBUILDER_SUCCESS:
            return { loading: false, video: action.payload }

        case VIDEO_INCIALIZE_BODYBUILDER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const videoInicializePersonalReducer = (state = { video: []}, action) => {
    switch (action.type) {
        case VIDEO_INCIALIZE_PERSONAL_REQUEST:
            return { loading: true, ...state }

        case VIDEO_INCIALIZE_PERSONAL_SUCCESS:
            return { loading: false, video: action.payload }

        case VIDEO_INCIALIZE_PERSONAL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const videoHumanPointsBodybuilderReducer = (state = { video: []}, action) => {
    switch (action.type) {
        case VIDEO_HUMANPOINTS_BODYBUILDER_REQUEST:
            return { loading: true, ...state }

        case VIDEO_HUMANPOINTS_BODYBUILDER_SUCCESS:
            return { loading: false, video: action.payload }

        case VIDEO_HUMANPOINTS_BODYBUILDER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const videoHumanPointsPersonalReducer = (state = { video: []}, action) => {
    switch (action.type) {
        case VIDEO_HUMANPOINTS_PERSONAL_REQUEST:
            return { loading: true, ...state }

        case VIDEO_HUMANPOINTS_PERSONAL_SUCCESS:
            return { loading: false, video: action.payload }

        case VIDEO_HUMANPOINTS_PERSONAL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const videoStopBodybuilderReducer = (state = { video: []}, action) => {
    switch (action.type) {
        case VIDEO_STOP_BODYBUILDER_REQUEST:
            return { loading: true, ...state }

        case VIDEO_STOP_BODYBUILDER_SUCCESS:
            return { loading: false, video: action.payload }

        case VIDEO_STOP_BODYBUILDER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const videoStopPersonalReducer = (state = { video0: [],  video1: [],  video2: []}, action) => {
    switch (action.type) {
        case VIDEO_STOP_PERSONAL_REQUEST:
            return { loading: true, ...state }

        case VIDEO_STOP_PERSONAL_SUCCESS0:
            return {
                ...state,
                successVideo0: true,
                video0: action.payload
            }

        case VIDEO_STOP_PERSONAL_SUCCESS1:
            return {
                ...state,
                video1: action.payload
            }

        case VIDEO_STOP_PERSONAL_SUCCESS2:
            return {
                ...state,
                video2: action.payload
            }

        case VIDEO_STOP_PERSONAL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}