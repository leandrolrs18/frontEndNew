import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

function ExerciseCarousel() {
    const dispatch = useDispatch()

    const exerciseTopRated = useSelector(state => state.exerciseTopRated)
    const { error, loading, exercises } = exerciseTopRated

    useEffect(() => {
        
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {exercises.map(exercise => (
                        <Carousel.Item key={exercise._id}>
                            <Link to={`/exercise/${exercise._id}`}>
                                <Image src={exercise.image} alt={exercise.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{exercise.name} (${exercise.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ExerciseCarousel
