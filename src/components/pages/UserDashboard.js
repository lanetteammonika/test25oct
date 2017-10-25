import React, {Component} from 'react';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
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
import axios, {post} from 'axios';
import {findDOMNode} from 'react-dom';


class UserDashboard extends Component {


    constructor(props){
        super(props);
        const { cookies } = this.props;
        sessionStorage.getItem('userId');
        sessionStorage.getItem('role');

        localStorage.getItem('userId');
        this.state = {
            name: cookies.get('userId') || 'Ben',
            file: '',
        };
    }
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };



//
    handleNameChange(name) {
        const {cookies} = this.props;

       // cookies.set('name', name);
        cookies.save('userId', userId, { path: '/' });
        this.setState({name});
    }
    onLogout() {
        const {cookies} = this.props;
        cookies.remove('userId');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');

        localStorage.removeItem('userId');
        this.props.history.push("/");

    }



    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        this.fileUpload(this.state.file)
        window.location.reload();

    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,

            });
        }

        reader.readAsDataURL(file)

    }
//Today's work:-=>create api find all user and change password in node js=>implement forget password,upload image and store values in cookie in reactjs
    fileUpload(file) {
        debugger
        const title= findDOMNode(this.refs.title).value;
        const description= findDOMNode(this.refs.description).value;
        const id=sessionStorage.getItem('userId');
        console.log('sdfs------',id)
        const url = 'http://localhost:4000/userpost/'+id;
        const formData = new FormData();
        formData.append('userId', id)

        formData.append('title', title)
        formData.append('description', description)
        formData.append('userPhoto', file)
        formData.append('userId', id)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config)
            .then((res) => {
                debugger
                console.log(res);
            })
            .catch((err) => {
                debugger
                console.log(err);
            })
    }

    onClickUser(){
        this.props.history.push("/alluser");
    }

    onClickPost(){
        this.props.history.push("/allpost");
    }
    // setter
   // sessionStorage.setItem('myData', data);

// getter
  //  sessionStorage.getItem('userId');

    render() {
        const {name} = this.state;

        return (
            <Well>
            <Row>

                <Col xs={12} sm={8} smOffset={2}>
                    <Panel>
                        <FormGroup controlId="title" validationState={this.state.valname}>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Title"
                                ref="title"
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup controlId="description" validationState={this.state.valname}>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Description"
                                ref="description"
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                <FormGroup controlId="image">

                    <ControlLabel>select Image</ControlLabel>
                    <input type="file" onChange={(e) => this._handleImageChange(e)}/>
                    <FormControl.Feedback/>

                </FormGroup>
                <Button bsStyle="primary" onClick={(e) => this._handleSubmit(e)}>
                    upload
                </Button>


                    </Panel>
                </Col>
            </Row>
            </Well>
        );

    }
}
export default (withCookies(UserDashboard));

//export default withCookies(UserDashboard);