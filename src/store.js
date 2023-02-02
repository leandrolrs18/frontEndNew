import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    exerciseListReducer,
    exerciseDetailsReducer,
    exerciseDeleteReducer,
    exerciseCreateReducer,
    exerciseUpdateReducer,
    exerciseReviewCreateReducer,
    exerciseTopRatedReducer,
    exerciseReducer,
    muscleListReducer,
} from './reducers/exerciseReducers'

import {
    exerciseDoneCreateReducer,
    articulationDetailsReducer,
    serieDetailsReducer,
    articulationsDetailsReducer,
    feedBodybuilderReducer,
    feedPersonalReducer
} from './reducers/exerciseDoneReducers'

import {
    videoInicializeBodybuilderReducer,
    videoInicializePersonalReducer,
    videoHumanPointsBodybuilderReducer,
    videoHumanPointsPersonalReducer,
    videoStopBodybuilderReducer,
    videoStopPersonalReducer,
} from './reducers/videoReducers'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'


const reducer = combineReducers({
    exerciseList: exerciseListReducer,
    exerciseDetails: exerciseDetailsReducer,
    exerciseDelete: exerciseDeleteReducer,
    exerciseCreate: exerciseCreateReducer,
    exerciseUpdate: exerciseUpdateReducer,
    exerciseReviewCreate: exerciseReviewCreateReducer,
    exerciseTopRated: exerciseTopRatedReducer,
    muscleList: muscleListReducer,

    exerciseDoneCreate: exerciseDoneCreateReducer,
    articulationDetails: articulationDetailsReducer,
    serieDetails: serieDetailsReducer,
    articulationsDetails: articulationsDetailsReducer,
    feedBodybuilder: feedBodybuilderReducer,
    feedPersonal: feedPersonalReducer,

    videoInicializeBodybuilder: videoInicializeBodybuilderReducer,
    videoInicializePersonal: videoInicializePersonalReducer,
    videoHumanPointsBodybuilder: videoHumanPointsBodybuilderReducer,
    videoHumanPointsPersonal: videoHumanPointsPersonalReducer,
    videoStopBodybuilder: videoStopBodybuilderReducer,
    videoStopPersonal: videoStopPersonalReducer,

    exercise: exerciseReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const exerciseDataFromStorage = localStorage.getItem('exerciseData') ?
    JSON.parse(localStorage.getItem('exerciseData')) : {}

const initialState = {
    exercise: {
        exerciseData: exerciseDataFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store