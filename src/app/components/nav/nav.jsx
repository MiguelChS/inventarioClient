import React from 'react';
import { Navbar,Nav,NavDropdown,MenuItem,NavItem } from 'react-bootstrap';
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
                    {menuByRol(props.roles,props)}
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

function menuByRol(roles,props) {
    let flag = true;
    let resultMenu = [];
    roles.forEach((item,index) =>{
        if((item == 1 || item == 2 || item == 3) && flag){
            resultMenu.push(
                <NavDropdown key={index} title="Alta" id="basic-nav-dropdown" disabled={props.request}>
                    <MenuItem onClick={()=>{ props.dispatch(page.pageAltaSite()) }}>Site</MenuItem>
                    <MenuItem onClick={()=>{ props.dispatch(page.pageAltaPosicion()) }}>Posicion</MenuItem>
                    <MenuItem onClick={()=>{ props.dispatch(page.pageAltaEquipo()) }}>Equipo</MenuItem>
                </NavDropdown>
            );
            resultMenu.push(
                <NavDropdown key={index + 10} title="Modificacion" id="basic-nav-dropdown" disabled={props.request}>
                    <MenuItem onClick={()=>{ props.dispatch(page.pageModificarEquipo()) }}>Equipo</MenuItem>
                    <MenuItem onClick={()=>{ props.dispatch(page.pageModificacionSite()) }}>Site</MenuItem>
                    <MenuItem>Posicion</MenuItem>
                </NavDropdown>
            );
            flag = false;
        }

        switch (item){
            case 4:{
                resultMenu.push(
                    <NavItem key={index} eventKey={1} disabled={props.request} onClick={()=>{props.dispatch(page.PageDBA())}}>DBA</NavItem>
                );
                break;
            }
            case 5:{
                resultMenu.push(
                    <NavItem key={index} eventKey={1} disabled={props.request} onClick={()=>{props.dispatch(page.PageUsuario())}}>Usuarios</NavItem>
                );
                break;
            }
        }
    })
    return resultMenu;
}

export default connect((state)=>{
    return{
        nombre: state.app.nombreUsuario,
        roles:state.app.roles,
        request: state.app.Request
    }
})(NavComponent);

