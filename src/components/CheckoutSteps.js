import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4, step5 }) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Login</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/data'>
                        <Nav.Link>Dado</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Dado</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/indications'>
                        <Nav.Link>Indicação</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Indicação</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/record/personal'>
                        <Nav.Link>Grave</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Grave</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step5 ? (
                    <LinkContainer to='/resumo'>
                        <Nav.Link>Resumo</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Resumo</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
