import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { listMuscles, saveExerciseData } from '../actions/exerciseActions'
import { getArticulations } from '../actions/exerciseDoneActions'
import { listUsers } from '../actions/userActions'

function DataScreen({ history }) {

    const exercise = useSelector(state => state.exercise)
    const { exerciseData } = exercise

    const muscleList = useSelector(state => state.muscleList)
    const { errorM, loadingM, muscles } = muscleList

    const userList = useSelector(state => state.userList)
    const { error, loading, users } = userList

    const dispatch = useDispatch()

    const [name, setName] = useState(exerciseData.name)
    const [description, setDescription] = useState(exerciseData.description)

    const [muscle, setMuscle] = useState([exerciseData.muscle])
    const [user, setUser] = useState(exerciseData.users)

    useEffect(() => {
        console.log(muscle)
        dispatch(listMuscles())
        dispatch(listUsers())
        users.map(item => 
            (
                console.log(item.name)
            )
        )
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        let muscleName = ""
        let userName = []
        muscles.map( (item) => {
            if(item._id == muscle) {
                muscleName = item.name
            }
        })
        users.map( (item) => {
            user.map( (userItem) => { 
                if(item._id == userItem) {
                    userName.push(item.name)
                }
            })
        })
        dispatch(saveExerciseData({ name, description, muscle, muscleName, user, userName }))
        dispatch(getArticulations(muscle))
        history.push('/indications')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 step5/>
            <FormContainer>
            <h1>Dados do Exercício</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Digite Nome'
                        value={name ? name : ''}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Descreva'
                        value={description ? description : ''}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='muscle'>
                    <Form.Label>Músculo Principal</Form.Label>
                    <Form.Control
                        as='select'
                        value={muscle}
                        onChange={(e) => setMuscle(e.target.value)}
                    >
                        {muscles.map(item => ( 
                           <option value={item._id}>{item.name}</option>
                            )
                        )}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='user'>
                    <Form.Label>Alunos</Form.Label>
                    <Form.Control
                        as='select'
                        // type='select'
                        placeholder='Pode Selecionar mais de um '
                        multiple
                        value={user}
                        onChange={e => setUser([].slice.call(e.target.selectedOptions).map(item => item.value))}
                    >
                        {users && users.map(item => ( 
                            <option value={item._id}>{item.name}</option>
                            )
                        )}
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

export default DataScreen
