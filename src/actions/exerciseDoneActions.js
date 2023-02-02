import axios from 'axios'
import {
    EXERCISE_DONE_LIST_REQUEST,
    EXERCISE_DONE_LIST_SUCCESS,
    EXERCISE_DONE_LIST_FAIL,

    EXERCISE_DONE_DETAILS_REQUEST,
    EXERCISE_DONE_DETAILS_SUCCESS,
    EXERCISE_DONE_DETAILS_FAIL,

    EXERCISE_DONE_DELETE_REQUEST,
    EXERCISE_DONE_DELETE_SUCCESS,
    EXERCISE_DONE_DELETE_FAIL,

    EXERCISE_DONE_CREATE_REQUEST,
    EXERCISE_DONE_CREATE_SUCCESS,
    EXERCISE_DONE_CREATE_FAIL,

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

    FEED_BODYBUILDER_REQUEST,
    FEED_BODYBUILDER_SUCCESS,
    FEED_BODYBUILDER_FAIL,

    FEED_PERSONAL_REQUEST,
    FEED_PERSONAL_SUCCESS,
    FEED_PERSONAL_FAIL

} from '../constants/exerciseDoneConstants'


export const listExercises = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: EXERCISE_DONE_LIST_REQUEST })

        const { data } = await axios.get(`/api/exercises${keyword}`)

        dispatch({
            type: EXERCISE_DONE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EXERCISE_DONE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listMyExercises = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXERCISE_DONE_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/exercises/myexercises/`,
            config
        )

        dispatch({
            type: EXERCISE_DONE_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: EXERCISE_DONE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listExerciseDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: EXERCISE_DONE_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/exercises/${id}`,
            config
        )

        dispatch({
            type: EXERCISE_DONE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EXERCISE_DONE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteExercise = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXERCISE_DONE_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/exercises/delete/${id}/`,
            config
        )

        dispatch({
            type: EXERCISE_DONE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: EXERCISE_DONE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createExerciseDone = (info) => async (dispatch, getState) => {
    try {
        dispatch({
            type:  EXERCISE_DONE_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/exercises_done/create/exercisedone/`,
            info,
            config
        )
        dispatch({
            type:  EXERCISE_DONE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type:  EXERCISE_DONE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createSerie = (info) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERIE_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/exercises_done/create/serie/`,
            info,
            config
        )
        dispatch({
            type: SERIE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: SERIE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createArticulation = (dadosArt) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICULATION_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/exercises_done/create/articulation/`,
            dadosArt,
            config
        )
        dispatch({
            type: ARTICULATION_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ARTICULATION_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateExercise = (exercise) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXERCISE_DONE_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/exercises/update/${exercise._id}/`,
            exercise,
            config
        )
        dispatch({
            type: EXERCISE_DONE_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: EXERCISE_DONE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getArticulations = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ARTICULATION_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/exercises_done/articulations/${id}`,
            config
        )

        dispatch({
            type: ARTICULATION_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICULATION_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listSeriesDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SERIE_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/exercises_done/serie/${id}`,
            config
        )

        dispatch({
            type: SERIE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SERIE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listArticulationsDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ARTICULATION_RESULTS_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/exercises_done/resultarticulations/${id}`,
            config
        )

        dispatch({
            type: ARTICULATION_RESULTS_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICULATION_RESULTS_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listFeedBodybuilder = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FEED_BODYBUILDER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/exercises_done/feed/bodybuilder`,
            config
        )

        dispatch({
            type: FEED_BODYBUILDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: FEED_BODYBUILDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listFeedPersonal = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FEED_PERSONAL_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/exercises_done/feed/personal`,
            config
        )

        dispatch({
            type: FEED_PERSONAL_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: FEED_PERSONAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}