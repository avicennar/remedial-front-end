import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';


class Header extends Component {

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
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink href="/editmovie">Manage Movie</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/editkategori">Manage Categories</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/editconnection">Connect Movies * Category</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                    ) 
                }
            }

export default Header;