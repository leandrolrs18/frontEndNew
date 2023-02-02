import api from '../services/api';
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

export const inicializeBodybuilder = (id, info) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_INCIALIZE_BODYBUILDER_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(info)
        const { data } = await api.post(
            `/exec_exercicio_feito/${id}`,
            info,
            config
        )

        dispatch({
            type: VIDEO_INCIALIZE_BODYBUILDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VIDEO_INCIALIZE_BODYBUILDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const inicializePersonal = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_INCIALIZE_PERSONAL_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await api.get(
            `/exec_exercicio/${id}`,
            config
        )

        dispatch({
            type: VIDEO_INCIALIZE_PERSONAL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VIDEO_INCIALIZE_PERSONAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const humanPointsBodybuilder = (id, points) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_HUMANPOINTS_BODYBUILDER_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await api.post(
            `/pointsHuman/builder/${id}`,
            {'results': points},
            config
        )

        dispatch({
            type: VIDEO_HUMANPOINTS_BODYBUILDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VIDEO_HUMANPOINTS_BODYBUILDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const humanPointsPersonal = (id, points) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_HUMANPOINTS_PERSONAL_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await api.post(
            `/pointsHuman/${id}`,
            {'results': points},
            config
        )

        dispatch({
            type: VIDEO_HUMANPOINTS_PERSONAL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VIDEO_HUMANPOINTS_PERSONAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const stopBodybuilder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_STOP_BODYBUILDER_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await api.get(
            `/stop_exercicio_feito/${id}`,
            config
        )

        dispatch({
            type: VIDEO_STOP_BODYBUILDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VIDEO_STOP_BODYBUILDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const stopPersonal = (id, idArt) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_STOP_PERSONAL_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await api.get(
            `/stop_exercicio/${id}/${idArt}`,
            config
        )
        switch (idArt){
            case 0: 
                dispatch({
                    type: VIDEO_STOP_PERSONAL_SUCCESS0,
                    payload: data
                })
                break;
            case 1: 
                dispatch({
                    type: VIDEO_STOP_PERSONAL_SUCCESS1,
                    payload: data
                })
                break;
            case 2: 
                dispatch({
                    type: VIDEO_STOP_PERSONAL_SUCCESS2,
                    payload: data
                })
                break;
            default:
                console.log('default');
        }


    } catch (error) {
        dispatch({
            type: VIDEO_STOP_PERSONAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}