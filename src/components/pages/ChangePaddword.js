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
import {changepassword} from '../../actions/userAction';
import axios from 'axios';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            token: '',
        }
    }

    componentDidMount() {
        debugger
        const id = this.props.location.pathname.split('/')[2];
        // this.setState({token:id});
        console.log('token----', this.state.token)


        axios.get('http://localhost:4000/gettokenrecord/' + id)
            .then(function (res) {
                console.log('response from change password-----', res.data.token)
            })
            .catch(function (err) {
                console.log(err)
            })
        axios.delete('http://localhost:4000/removetoken/' + id)
            .then(function (res) {

                console.log('response from change password-----', res.data);


                // dispatch({
                //     type: "USER_SIGNIN_ERROR",
                //     payload: res.data.msg
                // })
                //

            })
            .catch(function (err) {

                console.log(err);

            })

    }

    changePassword() {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');

        const id = this.props.location.pathname.split('/')[2];
        const password=findDOMNode(this.refs.password).value;
        const confirmpassword=findDOMNode(this.refs.confirmpassword).value
if(password !== "" && confirmpassword !== ""){
            if(password === confirmpassword){
                const user =
                    {
                        token:id,
                        password: findDOMNode(this.refs.password).value
                    }
                this.props.changepassword(user,()=>{
                    this.props.history.push("/login");
                });
            }else{
                this.setState({msg:'confirm password not match'})
            }
}else{
    this.setState({msg:'Enter Password'})

}

    }

    render() {
        return (
            <Well>
                <Row>

                    <Col xs={12} sm={8} smOffset={2}>
                        <Panel>
                            <FormGroup controlId="password">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="Password"
                                    placeholder="Enter Password"
                                    ref="password"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="confirmpassword">

                                <ControlLabel>Confirm Password</ControlLabel>
                                <FormControl
                                    type="Password"
                                    placeholder="Enter Confirm Password"
                                    ref="confirmpassword"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>

                            <h6 style={{color: 'red'}}>{this.state.msg}</h6>
                            <Button bsStyle="primary" onClick={this.changePassword.bind(this)}>
                                Change Password
                            </Button>
                            <Button bsStyle="primary" style={{marginLeft:"15px"}}  onClick={()=>this.props.history.push("/updateprofile")}>
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
        msg: state.users.msg,

    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({changepassword: changepassword}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
//export default ChangePassword;