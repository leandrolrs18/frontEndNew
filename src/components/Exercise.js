import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Exercise({ exercise }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/exercise/${exercise._id}`}>
                <Card.Img src={exercise.image} />
            </Link>

            <Card.Body>
                <Link to={`/exercise/${exercise._id}`}>
                    <Card.Title as="div">
                        <strong>{exercise.name} </strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <strong>repetições: {exercise.repetitions} </strong>
                        <strong>series: {exercise.series} </strong>
                        <strong>tempo de descando: {exercise.restTime} </strong>
                    </div>
                </Card.Text>


                <Card.Text as="h3">
                    {exercise.muscle.name}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Exercise
