import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveExerciseIndications } from '../actions/exerciseActions'
import { inicializePersonal } from '../actions/videoActions'

function IndicationsScreen({ history }) {

    const exercise = useSelector(state => state.exercise)
    const { exerciseData } = exercise

    const dispatch = useDispatch()

    const [series, setSeries] = useState()
    const [repetitions, setRepetitions] = useState()
    const [restTime, setRestTime] = useState()
    const [weight, setWeight] = useState()

    if (!exerciseData.name) {
        history.push('/data')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveExerciseIndications({series, repetitions, restTime, weight}))
        dispatch(inicializePersonal(1))
        history.push('/record/personal')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 step5/>
            <FormContainer>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='series'>
                    <Form.Label>Séries</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Defina o nº de séries'
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='repeticoes'>
                    <Form.Label>Repetições</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Defina o nº de repetições'
                        value={repetitions}
                        onChange={(e) => setRepetitions(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='descanso'>
                    <Form.Label>Tempo de descanso</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Defina o tempo de descanso em segundos'
                        value={restTime}
                        onChange={(e) => setRestTime(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='peso'>
                    <Form.Label>Peso</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Defina o peso em kg'
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'
                        style={{ backgroundColor: "#20295F"}}>
                    Continue
                </Button>
            </Form>
            </FormContainer>
        </div>
    )
}

export default IndicationsScreen
