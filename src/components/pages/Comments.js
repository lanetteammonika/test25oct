import React,{Component} from 'react';

class Comment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            comment:''
                    }
    }

    componentDidMount() {

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
                console.log('comment-----', res.data);
                // this.setState({user:res.data.user[0]})
                // console.log(this.state.user);

            })
            .catch((err) => {

                console.log(err);
            })
    }

    onClick(event) {

        //this.setState({comment:findDOMNode(this.refs.comments).value})
        //console.log(findDOMNode(this.refs.comments).value)
        console.log(event.target.value)
        this.setState({comment: event.target.value})
    }

    render(){
        if (this.state.posts[0]) {
            return (
                <Grid>
                    <Row>
                        <Col xs={12}>
                            {this.state.posts.map((data, index) => {
                                return (
                                    <Panel>
                                        {data.commentId !== []
                                        ? (
                                        data.commentId.map((com,i)=>{
                                        return(
                                        <div>
                                        <img src={com.userId.image}
                                        style={{width: '5%'}}
                                        />
                                        <p style={{color:'#00bfff'}}>{com.userId.name}</p>
                                        <p style={{color:'#00bfff'}}>{com.createdAt}</p>
                                        <p style={{color:'#00bfff'}}>{com.comment}</p>

                                        </div>
                                        )
                                        }))
                                        : ('')}


                                        <img src={data.userId.image}
                                        style={{width: '5%'}}
                                        />
                                        <label style={{marginLeft: '15px'}}>{data.userId.name}</label>

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
                                        <Button bsStyle="default">Button</Button>
                                        </p>
                                    </Panel>
                                )
                            })}
                        </Col>
                    </Row>
                </Grid>
            )
        }
        else {
            return (
                <div>loading...</div>
            )
        }
    }
}

export default Comment;