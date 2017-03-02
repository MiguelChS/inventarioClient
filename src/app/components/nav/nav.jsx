import React from 'react';
import { Navbar,Nav,NavDropdown,MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

export default class Navegador extends React.Component{

    render(){
        return(
            <Navbar style={{borderRadius:"0px"}} inverse collapseOnSelect >
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"> Inventario </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Alta" id="basic-nav-dropdown">
                            <LinkContainer to="equipo"><MenuItem>Equipo</MenuItem></LinkContainer>
                            <LinkContainer to="site"><MenuItem eventKey={3.2}>Site</MenuItem></LinkContainer>
                            <LinkContainer to="posicion"><MenuItem eventKey={3.2}>Posicion</MenuItem></LinkContainer>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Modificacion" id="basic-nav-dropdown">
                            <LinkContainer to="modEquipo"><MenuItem>Equipo</MenuItem></LinkContainer>
                            <MenuItem eventKey={3.2}>Site</MenuItem>
                            <MenuItem eventKey={3.3}>Posicion</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}