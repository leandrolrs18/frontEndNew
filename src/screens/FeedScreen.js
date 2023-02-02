import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { listFeedBodybuilder } from '../actions/exerciseDoneActions'

function FeedScreen({ match, location, history }) {

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    //  verificar se for personal e criar o feed a partir disso

    const feedBodybuilder = useSelector(state => state.feedBodybuilder)
    const { loadingFeed, feed } = feedBodybuilder
    
    useEffect(() => {
        //  verificar se for personal e dispachar a parir disso
        // trzer series feitas, repetiçoes feitas
        // depois deve se gravar as mensagens em cada articulação (?)  para trazer isso
        // no caso do professor, terá a o botão ver detalhes que liberará o modal com números
        dispatch(listFeedBodybuilder())
    }, [dispatch])


    const removeFromCartHandler = (id) => {
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Exercícios Feito</h1>
                {/* <Message variant='info'>
                        Não possui exercícios feito <Link to='/'>Voltar</Link>
                </Message> */}
                {feed.length === 0 ? (
                    <Message variant='info'>
                        Não possui exercícios feito <Link to='/'>Voltar</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {feed.map(item => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.exercise.image} alt={item.exercise.image} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.exercise.name}`}>{item.exercise.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            {item.exercise.muscle.name}
                                        </Col>

                                        <Col md={2}>
                                            {item.exercise.repetitions}
                                        </Col>

                                        {/* <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col> */}

                                        {/* <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Total de Mensagens (0)</h2>
                           
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            onClick={checkoutHandler}
                        >
                            Visualizar
                        </Button>
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row>
    )
}

export default FeedScreen