import React,{Component} from 'react';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import {
    Well,
    Panel,
    Row,
    Col,Button,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';
import axios from 'axios';





//selectRow={ selectRowProp }
class DisplayUser extends Component{
    constructor(props){
        super(props);
        this.state={
            user:[],
            email:'',
            bodytext:''
        };

    }

    componentDidMount(){
        axios.get('http://localhost:4000/getalluser')
            .then((res)=>{
            this.setState({user:res.data.user})
                console.log('respose---',this.state.user);
            })
            .catch((err)=>{
                console.log('error---',err)
            })
    }

    onClickBack(){
        this.props.history.push("/userdashboard");

    }
    handleRender() {
        this.props.history.push("/userdashboard",);
    }
    // onRowSelect(row, isSelected, e) {
    //     let rowStr = '';
    //     for (const prop in row) {
    //         rowStr += prop + ': "' + row[prop] + '"';
    //     }
    //     console.log(row.email);
    //     debugger
    //     this.setState({email:row.email});
    //     //alert(`is selected: ${isSelected}, ${rowStr}`);
    // }
    sendMail(){
        const commentPost = {
            text: this.state.bodytext,

        }
        console.log('comment obj----', commentPost)
        const url = 'http://localhost:4000/sendmail/'+this.state.email;
console.log('url-----',url)
        axios.post(url, commentPost)
            .then((res) => {
                console.log('send mail-----', res.data);
                // this.setState({user:res.data.user[0]})
                // console.log(this.state.user);
alert(' mail sent');
                window.location.reload();

                this.props.history.push("/alluser");

            })
            .catch((err) => {

                console.log(err);
            })
    }
    cancelMail(){
        window.location.reload();
        this.props.history.push("/alluser");
    }
    onClick(event) {

        //this.setState({comment:findDOMNode(this.refs.comments).value})
        //console.log(findDOMNode(this.refs.comments).value)
        console.log(event.target.value)
        this.setState({bodytext: event.target.value})
    }
    onRowSelect(row, isSelected, e) {
   console.log('row----',row);
   this.setState({email:row.email})
      //  console.log('email=====',this.state.email)

    }
    render(){
        const cellEditProp = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.onRowSelect.bind(this),
            // mode: 'click',
            // blurToSave: true,
            // beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
            // afterSaveCell: onAfterSaveCell  // a hook for after saving cell
        };

        function imageFormatter(cell, row){
            return "<img style=width:20px src='"+cell+"' />" ;
        }
        const products=[{
            name:"dsf",
            email:"sdfd",
            image:"https://cdn4.iconfinder.com/data/icons/colicon/24/close_delete-128.png"
        }]
        var options = {
            onRowClick: function(row){
                console.log(row);
                this.setState({email:row.email})
            }
        }

        if(this.state.email === '') {
            return (
                <Well>
                    <Row>
                        <Col xs={12}>
                            <Panel>
                                <label>To sent an Email to perticular user select radio button</label>
                                <BootstrapTable data={ this.state.user } selectRow={cellEditProp}>
                                    <TableHeaderColumn dataField='name' width='50%' editable={false}>User
                                        Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='email' width='50%' isKey editable={false}>User
                                        EmailId</TableHeaderColumn>
                                    <TableHeaderColumn dataField='isVerified' width='20%'>Verified</TableHeaderColumn>



                                    {/*<TableHeaderColumn dataField="image" dataFormat={imageFormatter}>Product Image</TableHeaderColumn>*/}
                                </BootstrapTable>
                                <Button bsStyle="warning" style={{marginLeft: "15px"}}
                                        onClick={this.handleRender.bind(this)}>
                                    Back
                                </Button>


                            </Panel>
                        </Col>
                    </Row>
                </Well>
            )
        }
        else{
           // console.log(this.state.email)
            return(
                <div>
                <FormGroup controlId="comments" validationState={null}>
                    <ControlLabel>Send Mail to {this.state.email}</ControlLabel>
                    <FormControl
                        name=""
                        type="text"
                        placeholder="Enter an Body Text"
                        ref="comments"
                        onChange={this.onClick.bind(this)}
                    />
                    <FormControl.Feedback/>

                </FormGroup>
                    <Button bsStyle="info" style={{marginLeft: "15px"}} onClick={this.sendMail.bind(this)}>
                        Send Mail
                    </Button>
                    <Button bsStyle="danger" style={{marginLeft: "15px"}} onClick={this.cancelMail.bind(this)}>
                        Cancel
                    </Button>
                </div>
            )
        }
    }
}
//cellEdit={ cellEditProp }
export default DisplayUser;