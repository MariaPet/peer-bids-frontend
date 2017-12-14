import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
    
    export default class Navigation extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <div>
                    <Navbar color="primary" light expand="md">
                        <NavbarBrand href="/">Peer Bids</NavbarBrand>
                    </Navbar>
                </div> 
            )
        }
    }