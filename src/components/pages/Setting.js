import React, {Component} from 'react';
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
import axios from 'axios';

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSrc: [],
            file: '',
            user:''
        }
    }

    getInitialState() {
        return {file: []}
    }

    componentDidMount() {
        const url = 'http://localhost:4000/getuser/' + sessionStorage.getItem('userId');
        axios.post(url)
            .then((res) => {

                console.log('user-----', res.data.user[0]);
                this.setState({user: res.data.user[0]})
                console.log(this.state.user);

            })
            .catch((err) => {

                console.log(err);
            })
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        this.fileUpload(this.state.file)
        window.location.reload();

        //axios.post('')
    }

    fileUpload(file) {
        debugger
        if (file !== '') {
            //const title= findDOMNode(this.refs.title).value;
            // const description= findDOMNode(this.refs.description).value
            const url = 'http://localhost:4000/uploadprofile/' + sessionStorage.getItem('userId');
            console.log('url---', url)
            const formData = new FormData();
            //formData.append('title', title)
            //formData.append('description', description)
            formData.append('userPhoto', file)
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
        else {
            alert('please select an image')
        }
    }

    _handleImageChange(e) {
        e.preventDefault();
        debugger
        let reader = new FileReader();
        let file = this.refs.file.files[0];

        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result],
                file: file
            });
        }.bind(this);
        console.log('handle uploading-', this.state.imgSrc);

        reader.readAsDataURL(file)

    }

    render() {
        return (
            <Well>
                <Row>

                    <Col xs={12} sm={8} smOffset={2}>
                        <Panel>
                            <FormGroup controlId="image">

                                <ControlLabel>select Image</ControlLabel>
                                <input ref="file" type="file" onChange={(e) => this._handleImageChange(e)}/>
                                <img src={this.state.imgSrc}
                                     style={{height: '80px', width: '80px', marginTop: '15px'}}/>
                                <FormControl.Feedback/>

                            </FormGroup>
                            <Button bsStyle="primary" onClick={(e) => this._handleSubmit(e)}>
                                upload
                            </Button>
                        </Panel>
                        <Panel>


                                <ControlLabel>Current Profile Image</ControlLabel>

                                <img src={this.state.user.image}
                                     style={{height: '80px', width: '80px', marginTop: '15px'}}/>




                        </Panel>
                    </Col>
                </Row>
            </Well>
        )
    }
}

export default Setting;