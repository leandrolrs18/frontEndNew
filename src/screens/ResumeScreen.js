import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createExercise } from '../actions/exerciseActions'
import { createExerciseDone, createSerie, createArticulation } from '../actions/exerciseDoneActions'

function ResumeScreen({ history }) {

    // const orderCreate = useSelector(state => state.orderCreate)
    // const { order, error, success } = orderCreate
    const exercisex = useSelector(state => state.exercise)
    const { exerciseData, exerciseIndications } = exercisex

    const exerciseCreate = useSelector(state => state.exerciseCreate)
    const { loadingExercise, success, exercise} = exerciseCreate

    const articulationDetails = useSelector(state => state.articulationDetails)
    const { loadingArticulations, successArticulations, articulations} = articulationDetails

    const exerciseDoneCreate = useSelector(state => state.exerciseDoneCreate)
    const   {   successExerciseDone, exerciseDone, 
                successSerie, serie, successArticulation, 
                articulation
            } = exerciseDoneCreate

    const videoStopPersonal = useSelector(state => state.videoStopPersonal)
    const { video0, video1, successVideo0 } = videoStopPersonal

    //console.log(exerciseData, exerciseIndications, video0, video1);

    const dispatch = useDispatch()

    if (!video0[0].mediaUp) {
        history.push('/record/personal')
    }

    useEffect(() => {

        if(success) {
            console.log("0", successExerciseDone, exerciseDone, 
            successSerie, serie, successArticulation, 
            articulation)
            dispatch (createExerciseDone ({
                exercise_id: exercise._id
            }))
        }

    }, [success]) //sucess

    useEffect(() => {
        if(successExerciseDone) {
            console.log("1", successExerciseDone, exerciseDone, 
            successSerie, serie, successArticulation, 
            articulation) 
            dispatch (createSerie ({
                exercise_done_id: exerciseDone._id,  //tem que criar o exercise_done para mandar
                timeUpMedia: video0[0].mediaTimeUp,  // tem que colocar os SD na api
                timeUpSD: video0[0].SDTimeUp, 
                timeDownMedia: video0[0].mediaTimeDown,
                timeDownSD: video0[0].SDTimeDown,  
            }))
        }
    }, [successExerciseDone])

    useEffect(() => {
        //console.log(successSerie, articulations[0]._id, articulations.length, video0[0].mediaUp)
        if(successSerie  && articulations[0]._id) {
            console.log("2", successExerciseDone, exerciseDone, 
            successSerie, serie, successArticulation, 
            articulation)
            for (let i=0; i< articulations.length; i++) {
                dispatch (createArticulation ({
                    serie_id: serie._id,  //tem que criar a série para mandar
                    articulation_id: articulations[i]._id,  // tem que puxar os id das articulações  no front
                    angleUpMedia: video0[0].mediaUp, 
                    angleUpSD: video0[0].SDUp,
                    angleDownMedia: video0[0].mediaDown, 
                    angleDownSD: video0[0].SDDown 
                }))
            }
        }
    }, [successSerie])

    const resume = (e) => {
        e.preventDefault()
        console.log("video1", video1);
        if (successVideo0) {
            dispatch(createExercise ({
                name : exerciseData.name,
                user_bodybuilder_id : exerciseData.user,
                muscle_id : exerciseData.muscle,
                description: exerciseData.description,
                restTime: exerciseIndications.restTime,
                repetitions: exerciseIndications.repetitions,
                series: exerciseIndications.series,
                weight: exerciseIndications.weight,    
            }))
        }
        // criar exercicio,
        // *criar criar exercicio_done(enviando exercicio_id)
        // *criar serie (enviando id_exercicioFeito e outros dados do resultado video como tempo)
        // * fazer for para criar articulação (enviar id_serie, id_articulação**, e outros dados do resultado video) 
        // =* usar o se for sucesso do anterior, talvez tenha que ficar dentro do UseEfecct
        // =**criar uma chamada anterior que busque as articulações, assim que preencher dados, 
        // ou quando traz os múculos possiveis, trazer as articulações mexendo no serializer

        // sugestão: ao inves de ficar mandando por FOR, deveria mandar de uma vez e o backend se virava para salvar
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 step5/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Dados</h2>
                            <p>
                                <strong>Nome: {exerciseData.name}</strong>
                                <br/>
                                <strong>Descrição: </strong>
                                {exerciseData.description}
                                <br/>
                                <strong>Músculo: </strong>
                                {exerciseData.muscleName}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Indicações</h2>
                            <p>
                                <strong>Séries: </strong>
                                {exerciseIndications.series}
                                <br/>
                                <strong>Repetições: </strong>
                                {exerciseIndications.repetitions}
                                <br/>
                                <strong>Tempo de descanso: </strong>
                                {exerciseIndications.restTime}
                                <br/>
                                <strong>Peso: </strong>
                                {exerciseIndications.weight}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Alunos</h2>
                            {exerciseData.userName.map((item, index) => ( 
                                <strong key={index}>Nome: {item} </strong>  
                            ))}
                            {/* {cart.cartItems.length === 0 ?  */}
                            <Message variant='info'>
                                Your cart is empty
                             </Message> 
                            {/*: (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )} */}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Resultados</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Ângulo descida (cotovelo):</Col>
                                    <Col>{video0[0].mediaUp}°</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Ângulo subida (cotovelo):</Col>
                                    <Col>{video0[0].mediaDown}°</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tempo de Subida:</Col>
                                    <Col>{video0[0].mediaTimeUp}s</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tempo de descida:</Col>
                                    <Col>{video0[0].mediaTimeDown}s</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Repetições:</Col>
                                    <Col>{video0[0].count}</Col>
                                </Row>
                            </ListGroup.Item>


                             {/*<ListGroup.Item>
                                 {error && 
                                    <Message variant='danger'>{"error"}</Message>
                                    
                            </ListGroup.Item>*/}

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    // disabled={cart.cartItems === 0}
                                    onClick={(e) => resume(e)}
                                    style={{ backgroundColor: "#20295F"}}
                                >
                                    Cadastrar Exercício
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ResumeScreen
