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
    DropdownItem} from 'reactstrap';
    import {Link} from 'react-router'
    
    export default class Navigation extends Component {
        constructor(props) {
            super(props);
            this.toggle = this.toggle.bind(this);
            this.state = {
                isOpen: false
            };
        }
        toggle() {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
        render() {
            return (
                <div>
                    <Navbar color="primary" dark expand="md" className="fixed-top">
                        <NavbarBrand href="/">Peer Bids</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link className="nav-link" to='/profile'>Profile</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link" to='/new'>Create Auction</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link" to='/map'>Map</Link>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Register</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div> 
            )
        }
    }