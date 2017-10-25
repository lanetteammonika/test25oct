'use strict'

import React, {Component} from 'react';
import {Nav, Navbar, NavItem, Badge} from 'react-bootstrap';

import {Link} from 'react-router';

class Menu extends Component {
    constructor(props) {

        super(props);
        this.state = {
            sessionId: sessionStorage.getItem('userId') || '',
            localStorage: localStorage.getItem('userId') || ''
        }
    }

    componentDidMount() {

        this.setState({sessionId: sessionStorage.getItem('userId')})
        console.log('-----', sessionStorage.getItem('role'))
    }

    logout() {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
    }

    render() {

        // this.setState({sessionId:sessionStorage.getItem('userId')})
        console.log('-----', sessionStorage.getItem('userId'))
        return (

            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        Test Demo
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {sessionStorage.getItem('userId') === null
                        ? (<div><Nav>

                        <NavItem eventKey={1} href="/login">
                            Login
                        </NavItem>
                        < NavItem eventKey={2} href="/signup"> SignUp </NavItem>

                    </Nav>
                    </div>) : (<div>
                        <Nav>

                            <NavItem eventKey={3} href="/userdashboard">
                                Home
                            </NavItem>




                            <NavItem eventKey={3} href="/setting">
                                Setting
                            </NavItem>


                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={3} href="/" onClick={this.logout}>
                                Logout
                            </NavItem>

                        </Nav>
                    </div>)}

                    {sessionStorage.getItem('role') === 'admin'
                        ? (
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/alluser">All User</NavItem>
                            <NavItem eventKey={2} href="/allpost">All Post Comment</NavItem>
                        </Nav>
                    )
                        : ('')
                    }


                </Navbar.Collapse>
            </Navbar>


        )
    }
}
export default Menu
