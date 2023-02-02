import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listExercises, deleteExercise, createExercise } from '../actions/exerciseActions'
import { EXERCISE_CREATE_RESET } from '../constants/exerciseConstants'

function ExerciseListScreen({ history, match }) {

    const dispatch = useDispatch()

    const exerciseList = useSelector(state => state.exerciseList)
    const { loading, error, exercises, pages, page } = exerciseList

    const exerciseDelete = useSelector(state => state.exerciseDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = exerciseDelete

    const exerciseCreate = useSelector(state => state.exerciseCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, exercise: createdExercise } = exerciseCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: EXERCISE_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/exercise/${createdExercise._id}/edit`)
        } else {
            dispatch(listExercises(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdExercise, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this exercise?')) {
            dispatch(deleteExercise(id))
        }
    }

    const createExerciseHandler = () => {
        dispatch(createExercise())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Exercises</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createExerciseHandler}>
                        <i className='fas fa-plus'></i> Create Exercise
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {exercises.map(exercise => (
                                        <tr key={exercise._id}>
                                            <td>{exercise._id}</td>
                                            <td>{exercise.name}</td>
                                            <td>${exercise.price}</td>
                                            <td>{exercise.category}</td>
                                            <td>{exercise.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/exercise/${exercise._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(exercise._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

export default ExerciseListScreen