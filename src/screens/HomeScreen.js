import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Exercise from '../components/Exercise'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ExerciseCarousel from '../components/ExerciseCarousel'
import { listMyExercises } from '../actions/exerciseActions'


function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const exerciseList = useSelector(state => state.exerciseList)
    const { error, loading, exercises, page, pages } = exerciseList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listMyExercises())

    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <ExerciseCarousel />}
            <Col>
            <h1>Últimos Exercícios</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {exercises.map(exercise => (
                                <Col key={exercise._id} sm={12} md={6} lg={4} xl={3}>
                                    <Exercise exercise={exercise} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
            </Col>
        </div>
    )
}

export default HomeScreen
