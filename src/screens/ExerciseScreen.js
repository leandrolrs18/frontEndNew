import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listExerciseDetails } from '../actions/exerciseActions'
import { listSeriesDetails, listArticulationsDetails } from '../actions/exerciseDoneActions'
import { EXERCISE_CREATE_REVIEW_RESET } from '../constants/exerciseConstants'
import { inicializeBodybuilder } from '../actions/videoActions'

function ExerciseScreen({ match, history }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const exerciseDetails = useSelector(state => state.exerciseDetails)
    const { loading, error, exercise } = exerciseDetails

    const serieDetails = useSelector(state => state.serieDetails)
    const { loadingSerie, serie } = serieDetails

    const articulationsDetails = useSelector(state => state.articulationsDetails)
    const { loadingArticulations, errorArticulations, articulations } = articulationsDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const exerciseReviewCreate = useSelector(state => state.exerciseReviewCreate)
    const {
        loading: loadingExerciseReview,
        error: errorExerciseReview,
        success: successExerciseReview,
    } = exerciseReviewCreate

    useEffect(() => {
        dispatch(listExerciseDetails(match.params.id))
        // antes de testar, orgnaizar esse codigo com base no do personal
    }, [dispatch, match, successExerciseReview])
    
    useEffect(() => {
        console.log(exercise, exercise._id)
        if (exercise._id) {
            dispatch(listSeriesDetails(exercise._id))
        }
    }, [exercise])

    useEffect(() => {
        console.log(serie)
        if (serie[0]) {
            dispatch(listArticulationsDetails(serie[0]._id))
        }
    }, [serie])

    const play = () => {
        dispatch(inicializeBodybuilder(exercise._id, 
            {
                muscle : exercise.muscle.name,
                nArticulacao: 3,
                timeUpMedia: serie[0].timeUpMedia,
                timeUpSD: serie[0].timeUpSD,
                timeDownMedia: serie[0].timeDownMedia, 
                timeDownSD: serie[0].timeDownSD, 
                angleUpMedia:   [articulations[0].angleUpMedia, articulations[1].angleUpMedia, articulations[2].angleUpMedia],
                angleUpSD:      [articulations[0].angleUpSD, articulations[1].angleUpSD, articulations[2].angleUpSD], 
                angleDownMedia: [articulations[0].angleDownMedia, articulations[1].angleDownMedia, articulations[2].angleDownMedia],
                angleDownSD:    [articulations[0].angleDownSD, articulations[1].angleDownSD, articulations[2].angleDownSD]
            }
        ))
        history.push(`/record/bodybuilder`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Voltar</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={exercise.image} alt={exercise.name} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{exercise.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Series: {exercise.series}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Repeticoes: {exercise.repetitions}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Tempo de descanso: {exercise.restTime}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Descrição: {exercise.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                    <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Músculo:</Col>
                                                    <Col>
                                                        {/* <strong>{exercise.muscle.name}</strong> */}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>N° de articulações afetatas:</Col>
                                                    <Col>
                                                        {/* {exercise.muscle.nArticulacao} */}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {exercise.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {/* {

                                                                    [...Array(exercise.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                } */}

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}


                                            <ListGroup.Item>
                                                <Button
                                                    onClick={play}
                                                    className='btn-block'
                                                    //disabled={exercise.countInStock == 0}
                                                    type='button'>
                                                    Reproduzir
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            {userInfo.personal &&                                        
                            <Row>
                                <Col md={6}>
                                    <h4>Alunos</h4>
                                    {/* {exercise.reviews.length === 0 && <Message variant='info'>No Reviews</Message>} */}

                                    <ListGroup variant='flush'>
                                        {/* {exercise.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))} */}

                                        <ListGroup.Item>
                                            <h4>Alunos com este exercício</h4>

                                            {loadingExerciseReview && <Loader />}
                                            {successExerciseReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorExerciseReview && <Message variant='danger'>{errorExerciseReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Nome</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Alunos já adicionados</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    
                                                    <Button
                                                        disabled={loadingExerciseReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submeter
                                                    </Button>

                                                    {/* <Button
                                                        disabled={loadingExerciseReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Editar completo
                                                    </Button> */}

                                                </Form>
                                            ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            }   
                        </div>
                    )

            }


        </div >
    )
}

export default ExerciseScreen
