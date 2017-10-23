import React,{Component} from 'react';
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
import {loginUser} from '../../actions/userAction';
import {findDOMNode} from 'react-dom';
import axios from 'axios';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

class UserLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            valemail:"",
            valpass:"",
            msg:"",
        }
    }
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

//
    handleSetCookie(id,role) {
        const {cookies} = this.props;
        sessionStorage.setItem('userId', id);
        sessionStorage.setItem('role', role);

       // localStorage.setItem('userId', id);
        //cookies.set('userId', id, { path: '/' });
        this.props.history.push("/userdashboard");

        // cookies.save('userId', id, { path: '/' });
       // this.setState({name});
    }
    onLogout() {
        cookie.remove('userId', { path: '/' });
    }
    // setter
   // localStorage.setItem('userId', id);

// getter
   // localStorage.getItem('userId');
//     function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
// }
    handleSubmit(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        const user = {
            email: findDOMNode(this.refs.email).value,
            password: findDOMNode(this.refs.password).value,
        };
        let email=findDOMNode(this.refs.email).value;
        let password=findDOMNode(this.refs.password).value;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email !== null) {
            if (re.test(user.email)) {
                this.setState({valemail: "success"})
                if(password !== null){
                    this.setState({valpass: "success"})
                    this.props.loginUser(user, () => {
                        this.setState({msg:this.props.users.msg});
                        if(this.props.users.msg === "") {
                            this.setState({valemail: "success"})
                            this.setState({valpass: "success"});
                            this.handleSetCookie(this.props.users.user._id,this.props.users.user.role);
                           // console.log('id------',this.props.users.user._id);
                           // this.resetForm();
                        }else{
                            this.setState({valemail: "error"})
                            this.setState({valpass: "error"})
                            this.resetForm()
                            alert('please enter valid information');
                        }
                    })
                }else{
                    this.setState({valpass: "error"})

                }
            }else{
                this.setState({valemail: "error"})
                this.setState({msg: "enter valid email address"})
            }
        }else{
            this.setState({valemail: "error"})
        }
    }
    resetForm() {
        // this.props.resetButton();


        findDOMNode(this.refs.email).value='',
            findDOMNode(this.refs.password).value=''

    }
    handleRender() {
        this.props.history.push("/signup");

    }
    click(){
        let email=findDOMNode(this.refs.email).value;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email !== null) {
            if (re.test(email)) {
                axios.post('http://localhost:4000/finduser/'+email)
                    .then(function(res){
                        if(res.data.user!==null) {
                            axios.post('http://localhost:4000/forgetpassword/'+email)
                                .then(function (res) {

                                    alert('Check your Email and set your password');

                                })
                                .catch(function (err) {
                                    alert('Error while send Email');

                                })
                               // alert('Check your Email and set your password');
                        }else{
                            alert('User does not exist');
                        }
                       // this.setState({valemail: ""})
                        console.log('response from change password-----', res.data);
                    })
                    .catch(function (err) {
                        debugger
                        console.log(err);

                    })
            }else{
                this.setState({valemail: "error"})
            }
        }else{
            this.setState({valemail: "error"})
        }
       // alert('Hello World!')
    }
    render(){
        return(
            <Well>
                <Row>

                    <Col xs={12} sm={8} smOffset={2}>
                        <Panel>
                            <FormGroup controlId="email" validationState={this.state.valemail}>
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
                                    type="password"
                                    placeholder="Enter Password"
                                    ref="password"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <h6 style={{color:'red'}}>{this.state.msg}</h6>
                            <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>
                                Sign In
                            </Button>
                            <Button bsStyle="warning" style={{marginLeft:"15px"}} onClick={this.handleRender.bind(this)}>
                                Sign Up
                            </Button>
                            <a style={{ marginLeft:"15px" }} onClick={this.click.bind(this)}>forget password?</a>
                        </Panel>

                    </Col>
                </Row>

            </Well>        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.users,
        msg: state.users.msg,

    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({loginUser: loginUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(UserLogin))
//export default UserLogin;