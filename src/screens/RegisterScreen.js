import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({ location, history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [personal, setPersonal] = useState(false)
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password, personal))
        }

    }

    return (
        <FormContainer>
            <h1>Entrar</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Digite Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Digite Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Digite Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirme Senha</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirme Senha'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='personal'>
                    <Form.Check 
                        type={'checkbox'}
                        id={`personal`}
                        label={'Eu sou Personal Trainer'}
                        value={personal}
                        onChange={(e) => setPersonal(true)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'
                    style={{ backgroundColor: "#20295F"}}>
                    Registrar
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Tem uma conta? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Entrar
                        </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen
