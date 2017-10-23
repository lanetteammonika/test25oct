import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {
    Well,
    ControlLabel,
    FormGroup,
    FormControl,
    Panel,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postUser} from '../../actions/userAction';
//import axios from 'axios';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            valname:"",
            valemail:"",
            valpass:"",
            valrole:"",
            msg:""
        }
    }

    handleSubmit() {
        const user = {
            name: findDOMNode(this.refs.name).value,
            email: findDOMNode(this.refs.email).value,
            password: findDOMNode(this.refs.password).value,
            role: findDOMNode(this.refs.role).value,
        };
        debugger
if(user.email === "" && user.name === "" && user.password === "" ){
    this.setState({
        valname:"error",
        valemail:"error",
        valpass:"error",
        valrole:"error",
        msg:"Please Enter Details"
    })
}
let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (user.email !== null) {
            if (re.test(user.email)) {
                this.setState({valemail:"success"})
                if(user.name !== null){
                    this.setState({valname:"success"})
                    if(user.password !== null){
                        this.setState({valpass:"success"})
                        if(user.role !== null){
                            this.setState({valrole:"success"})
                            this.props.postUser(user,()=>{this.resetForm();this.props.history.push("/")});
                        }else{
                            this.setState({valrole:"error"})

                        }
                    }else{
                        this.setState({valpass:"error"})

                    }
                }else{
                    this.setState({valname:"error"})

                }
                // this is a valid email address
                // call setState({email: email}) to update the email
                // or update the data in redux store.
            }
            else {
                this.setState({valemail:"error",msg:"Enter Valid Email Address"})

                // invalid email, maybe show an error to the user.
            }

            //console.log(user);
            //this.props.postBooks(book);
        }else{
            this.setState({valemail:"error"})

        }
        // if(user.name !== null){
        //     this.setState({valname:"success"})
        //
        // }else{
        //     this.setState({valname:"error"})
        //
        // }
        // if(user.password !== null){
        //     this.setState({valpass:"success"})
        //
        // }else{
        //     this.setState({valpass:"error"})
        //
        // }
        // if(user.role !== null){
        //     this.setState({valrole:"success"})
        //
        // }else{
        //     this.setState({valrole:"error"})
        //
        // }


           // this.resetForm();

    }

    resetForm() {
        // this.props.resetButton();

        alert('Verification Link send in your '+findDOMNode(this.refs.email).value);
        findDOMNode(this.refs.name).value='',
            findDOMNode(this.refs.email).value='',
            findDOMNode(this.refs.password).value='',
            findDOMNode(this.refs.role).value=''

    }
    handleRender() {
        this.props.history.push("/");

    }

    render() {

        return (
            <Well>
                <Row>

                    <Col xs={12} sm={8} smOffset={2}>
                        <Panel>
                            <FormGroup controlId="name" validationState={this.state.valname}>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Name"
                                    ref="name"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="email" validationState={this.state.valemail} >

                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="email"
                                    placeholder="Enter Email"
                                    ref="email"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="password" validationState={this.state.valpass} >

                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="Password"
                                    placeholder="Enter Password"
                                    ref="password"
                                />
                                <FormControl.Feedback/>

                            </FormGroup>
                            <FormGroup controlId="formControlsSelect" validationState={this.state.valrole}>
                                <ControlLabel>Select</ControlLabel>
                                <FormControl componentClass="select" placeholder="select role" ref="role">
                                    <option value="normal">Normal</option>
                                    <option value="admin">Admin</option>
                                </FormControl>
                            </FormGroup>
                            {/*<FormGroup controlId="image" >*/}

                                {/*<ControlLabel></ControlLabel>*/}
                            {/*<input type="file" name="fileToUpload" id="fileToUpload" />*/}
                                {/*<FormControl.Feedback/>*/}

                            {/*</FormGroup>*/}
                            <h6 style={{color:'red'}}>{this.state.msg}</h6>
                            <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>
                              Sign up
                            </Button>
                            <Button bsStyle="danger" style={{marginLeft:"15px"}} onClick={this.handleRender.bind(this)}>
                                Cancel
                            </Button>
                        </Panel>

                    </Col>
                </Row>

            </Well>
        )
    }
}
function mapStateToProps(state) {
    return {
        users: state.users.users,

    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({postUser: postUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
///export default SignUp