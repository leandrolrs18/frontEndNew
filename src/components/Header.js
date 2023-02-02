import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar  collapseOnSelect
            style={{ backgroundColor: "#20295F"}}
             variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Exercitium</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <SearchBox /> */}
                            {userInfo ? (
                                <Nav className="ml-auto">
                                {userInfo.personal ? (
                                <LinkContainer to='/feed'>
                                    <Nav.Link >Alunos</Nav.Link>
                                </LinkContainer>
                                ) : (
                                <LinkContainer to='/feed'>
                                    <Nav.Link >Feedbacks</Nav.Link>
                                </LinkContainer>)
                                }

                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Perfil</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/data'>
                                        <NavDropdown.Item>Novo Exercicio</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Sair</NavDropdown.Item>

                                </NavDropdown>
                                </Nav>
                            ) : (
                                    <Nav className="ml-auto">
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Entrar</Nav.Link>
                                    </LinkContainer>
                                    </Nav>
                                )}


                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}


                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
