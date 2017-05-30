import React from 'react';
import { Navbar,Nav,NavDropdown,MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import {closeSession} from '../../actions/appAction';
import * as page from '../../actions/ActionRouter';

let NavComponent = (props)=>{
    return(
        <Navbar style={{borderRadius:"0px"}} fluid inverse collapseOnSelect >
            <Navbar.Header>
                <Navbar.Brand onClick={()=>{
                    props.dispatch(page.PageInicio())
                }}>
                    Inventario
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown title="Alta" id="basic-nav-dropdown">
                        <MenuItem onClick={()=>{ props.dispatch(page.pageAltaSite()) }}>Site</MenuItem>
                        <MenuItem onClick={()=>{ props.dispatch(page.pageAltaPosicion()) }}>Posicion</MenuItem>
                        <MenuItem onClick={()=>{ props.dispatch(page.pageAltaEquipo()) }}>Equipo</MenuItem>
                    </NavDropdown>
                    <NavDropdown title="Modificacion" id="basic-nav-dropdown">
                        <MenuItem onClick={()=>{ props.dispatch(page.pageModificarEquipo()) }}>Equipo</MenuItem>
                        <MenuItem onClick={()=>{ props.dispatch(page.pageModificacionSite()) }}>Site</MenuItem>
                        <MenuItem>Posicion</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavDropdown
                                 title={<span><i className="fa fa-user fa-fw"/>EN</span>}
                                 id="idioma">
                        <MenuItem eventKey='1'><i className="fa fa-envelope fa-fw"/>EN</MenuItem>
                        <MenuItem eventKey='1'><i className="fa fa-envelope fa-fw"/>ES</MenuItem>
                    </NavDropdown>
                    <NavDropdown title={`${props.nombre}`} id="Session">
                        <MenuItem onClick={()=>{props.dispatch(closeSession())}}>Close Session</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default connect((state)=>{
    return{
        nombre: state.app.nombreUsuario
    }
})(NavComponent);

