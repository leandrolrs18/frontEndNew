import axios from 'axios'
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

    EXERCISE_UPDATE_REQUEST,
    EXERCISE_UPDATE_SUCCESS,
    EXERCISE_UPDATE_FAIL,

    EXERCISE_SAVE_DATA,
    EXERCISE_SAVE_INDICATIONS,
    EXERCISE_SAVE_RESULTS

} from '../constants/exerciseConstants'


export const listExercises = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: EXERCISE_LIST_REQUEST })

        const { data } = await axios.get(`/api/exercises${keyword}`)

        dispatch({
            type: EXERCISE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EXERCISE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listMyExercises = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXERCISE_LIST_REQUEST
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
            type: EXERCISE_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: EXERCISE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listExerciseDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: EXERCISE_DETAILS_REQUEST })

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
            type: EXERCISE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EXERCISE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteExercise = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXERCISE_DELETE_REQUEST
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
            type: EXERCISE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: EXERCISE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createExercise = (info) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXERCISE_CREATE_REQUEST
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
            `/api/exercises/create/`,
            info,
            config
        )
        dispatch({
            type: EXERCISE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: EXERCISE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateExercise = (exercise) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXERCISE_UPDATE_REQUEST
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
            type: EXERCISE_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: EXERCISE_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: EXERCISE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMuscles = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MUSCLE_LIST_REQUEST
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
            `/api/exercises/muscles/`,
            config
        )

        dispatch({
            type: MUSCLE_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MUSCLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const saveExerciseData = (data) => (dispatch) => {
    dispatch({
        type: EXERCISE_SAVE_DATA,
        payload: data,
    })

    localStorage.setItem('ExerciseData', JSON.stringify(data))
}

export const saveExerciseIndications = (data) => (dispatch) => {
    console.log("olha", data);
    dispatch({
        type: EXERCISE_SAVE_INDICATIONS,
        payload: data,
    })

    localStorage.setItem('ExerciseIndications', JSON.stringify(data))
}

export const saveExerciseResults = (data) => (dispatch) => {
    dispatch({
        type: EXERCISE_SAVE_RESULTS,
        payload: data,
    })

    localStorage.setItem('ExerciseResults', JSON.stringify(data))
}