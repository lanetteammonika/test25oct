import React, {Component} from 'react';
import {
    Well,
    Panel,
    FormGroup,
    ControlLabel,
    FormControl,
    Modal,
    Row,
    Grid,
    Thumbnail,
    Col,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import {findDOMNode} from 'react-dom';
import Comment from './Comments'

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            posts: [],
            comment: '',
            lgShow: false,
            Show: false,
            comments: [],
            index:'',
            commentId:[],
            likeId:[],
            name:'',
            image:'',

        }

        this.onCommentClick =this.onCommentClick.bind(this)
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
        axios.get('http://localhost:4000/getAllPost')
            .then((res) => {

                console.log('resposeee---', res.data.posts);
                this.setState({posts: res.data.posts})

            })
            .catch((err) => {

                console.log('error---', err)
            })
        axios.get('http://localhost:4000/getusercomment')
            .then((res) => {
                this.setState({comments: res.data.comments})
                console.log('respose---', this.state.comments);
            })
            .catch((err) => {
                console.log('error---', err)
            })
    }

    onLikeClick(i){

        const commentPost = {
            postId: this.state.posts[i]._id,
            userId: this.state.posts[i].userId._id,
            frdId: sessionStorage.getItem('userId'),
        }
        console.log('comment obj----', commentPost)
        const url = 'http://localhost:4000/likepost/';
        axios.post(url, commentPost)
            .then((res) => {
                console.log('comment-----', res.data);
                // this.setState({user:res.data.user[0]})
                // console.log(this.state.user);

            })
            .catch((err) => {
                console.log(err);
            })
        axios.get('http://localhost:4000/getAllPost')
            .then((res) => {

                console.log('resposeee---', res.data.posts);
                this.setState({posts: res.data.posts})

            })
            .catch((err) => {

                console.log('error---', err)
            })
    }
    onCommentClick(i) {

        const commentPost = {
            postId: this.state.posts[i]._id,
            userId: sessionStorage.getItem('userId'),
            frdId: this.state.posts[i].userId._id,
            comment: this.state.comment
        }
        console.log('comment obj----', commentPost)
        const url = 'http://localhost:4000/commentpost/';
        axios.post(url, commentPost)
            .then((res) => {
                debugger
                console.log('comment-----', res.data);
                // this.setState({user:res.data.user[0]})
                // console.log(this.state.user);

            })
            .catch((err) => {

                console.log(err);
            })
        window.location.reload();
    }

    onClick(event) {

        //this.setState({comment:findDOMNode(this.refs.comments).value})
        //console.log(findDOMNode(this.refs.comments).value)
        console.log(event.target.value)
        this.setState({comment: event.target.value})
    }

    onGiveComment() {

        <Comment/>

        //alert('clicked........')
    }

    render() {
        const MyLargeModal = React.createClass({

            render() {
                //  if (this.state.posts !== []) {
                return (
                    <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                        <div style={{marginLeft: '20px',marginRight: '20px'}}>
                            <h4 style={{textAlign: 'center'}}>Lists of Comments</h4>
                            {this.props.data !== []
                                ? (
                                this.props.data.map((com, i) => {
                                   // let isApprove =com.isApprove;


                                        if(com.isApprove){
                                            return (

                                    <Panel>
                                        <img src={com.userId.image}
                                             style={{height: '50px',width: '50px',borderRadius: '50%', marginTop: '5px'}}
                                        />
                                        <p style={{color: '#00bfff'}}>{com.userId.name}</p>
                                        <p style={{color: '#00bfff'}}>{com.createdAt.split('T')[0].toString()}  {com.createdAt.split('T')[1].split('.')[0].toString()}</p>
                                        <p style={{color: '#00bfff'}}>{com.comment}</p>

                                    </Panel>
                                    )}
                                    else{
                                            return null;
                                        }
                                }))
                                :

                            ( <p>No comment in this post</p>)

                                }

                        </div>


                    </Modal>
                );
                // }else{
                //     <p>loading......</p>
                // }
            }
        });
        const MyModal = React.createClass({

            render() {
                console.log('like---',this.props.data)
                //  if (this.state.posts !== []) {
                return (
                    <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                        <div style={{marginLeft: '20px',marginRight: '20px'}}>
                            <h4 style={{textAlign: 'center'}}>Lists of Likes</h4>
                            {this.props.data !== []
                                ? (
                                this.props.data.map((com, i) => {
                                    return (
                                        <Panel>
                                            <img src={com.image}
                                                 style={{height: '50px',width: '50px',borderRadius: '50%',marginTop: '5px'}}
                                            />
                                            <p style={{color: '#00bfff'}}>{com.name}</p>



                                        </Panel>
                                    )
                                }))
                                :

                                ( <p>No like in this post</p>)

                            }

                        </div>


                    </Modal>
                );
                // }else{
                //     <p>loading......</p>
                // }
            }
        });

        let lgClose = () => this.setState({lgShow: false});
        let Close = () => this.setState({Show: false});

        if (this.state.posts[0]) {
            //console.log('img----',this.state.posts[0].userId.image)
            return (

                <Grid>
                    <Row>
                        <Col xs={12}>

                            {this.state.posts.map((data, index) => {
                                return (
                                    <Panel>
                                        <img src={data.userId.image}
                                             style={{height: '50px',width: '50px',borderRadius: '50%'}}
                                        />
                                        <label style={{marginLeft: '15px'}}>{data.userId.name}</label>
                                        <p>{data.createdAt.split('T')[0].toString()}  {data.createdAt.split('T')[1].split('.')[0].toString()}</p>
                                        <h3>{data.title}</h3>
                                        <p>{data.description}</p>
                                        <Thumbnail className="thumbnail-img" src={data.image}
                                                   style={{width: '50%', margin: '0 auto', height: '300px',}}
                                                   alt="50x50"/>


                                        <Panel>
                                            <div style={{display: 'inline'}}>
                                                <img
                                                    src="http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/blue-jelly-icons-symbols-shapes/017839-blue-jelly-icon-symbols-shapes-comment-bubble2.png"
                                                    style={{width: '5%', zIndex: '-1'}}
                                                    onClick={() => this.setState({lgShow: true,name:data.userId.name,commentId:data.commentId,image:data.userId.image,index:index})}
                                                />
                                            </div>
                                            <div style={{display: 'inline-block'}}>
                                                <p style={{color: '#000'}}> Comments</p>
                                            </div>
                                            <div style={{display: 'inline', marginLeft: '15px'}}>
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/6/67/Facebook_logo_thumbs_up_like_transparent.png"
                                                    style={{width: '5%', zIndex: '-1'}}
                                                    onClick={() => this.setState({Show: true,name:data.userId.name,likeId:data.likeId,image:data.userId.image,index:index})}
                                                />
                                            </div>
                                            <div style={{display: 'inline-block'}}>
                                                <p style={{color: '#000'}}>{data.likeId.length} Like</p>
                                            </div>
                                        </Panel>
                                        <img src={this.state.user.image}
                                             style={{height: '50px',width: '50px',borderRadius: '50%'}}
                                        />
                                        <label style={{marginLeft: '15px'}}>{this.state.user.name}</label>

                                        <FormGroup controlId="comments" validationState={null}>
                                            <ControlLabel>Add Comment......</ControlLabel>
                                            <FormControl
                                                name=""
                                                type="text"
                                                placeholder="Enter an Comment"
                                                ref="comments"
                                                onChange={this.onClick.bind(this)}
                                            />
                                            <FormControl.Feedback/>

                                        </FormGroup>
                                        <p>
                                            <Button bsStyle="primary" onClick={this.onCommentClick.bind(this, index)}>comment</Button>&nbsp;
                                            <Button bsStyle="info" onClick={this.onLikeClick.bind(this, index)}>Like</Button>
                                        </p>
                                    </Panel>
                                )
                            })}
                            <MyLargeModal
                                show={this.state.lgShow}
                                onHide={lgClose}
                                modalindex={this.state.index}
                                data={this.state.commentId}
                                userimage={this.state.image}
                                username={this.state.name}
                                uposts={this.state.posts}
                            />
                            <MyModal
                                show={this.state.Show}
                                onHide={Close}
                                modalindex={this.state.index}
                                data={this.state.likeId}
                                userimage={this.state.image}
                                username={this.state.name}
                                uposts={this.state.posts}
                            />
                        </Col>
                    </Row>

                </Grid>)
        }

        else {
            return (
                <div>loading...</div>
            )
        }
    }
}
export default Image;