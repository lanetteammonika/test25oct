// import React,{Component} from 'react';
// import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
// import {
//     Well,
//     Panel,
//     Row,
//     Col,
//     Button
// } from 'react-bootstrap';
// import axios from 'axios';
//
// const selectRowProp = {
//     mode: 'checkbox',
//     bgColor: 'pink',
//     clickToSelect: true,
//     onSelect: onRowSelect,
// };
// function onRowSelect(row, isSelected, e) {
//     if (isSelected ) {
//         const name=row.name;
//         //  alert('The selection only work on key which less than 3',row.email);
//         //return false;
//     }
// }
// //selectRow={ selectRowProp }
// class AddComment extends Component{
//     constructor(props){
//         super(props);
//         this.state={posts:[]}
//     }
//
//     componentDidMount(){
//         axios.get('http://localhost:4000/getAllPost')
//             .then((res)=>{
//                 this.setState({posts:res.data.posts})
//                 console.log('respose---',this.state.posts);
//             })
//             .catch((err)=>{
//                 console.log('error---',err)
//             })
//     }
//
//     handleRender(){
//         this.props.history.push("/userdashboard");
//
//     }
//     onAfterSaveCell(row, cellName, cellValue) {
//     alert(`Save cell ${cellName} with value ${cellValue}`);
//
//     let rowStr = '';
//     for (const prop in row) {
//         rowStr += prop + ': ' + row[prop] + '\n';
//     }
//
//     alert('Thw whole row :\n' + rowStr);
// }
//
//     onBeforeSaveCell(row, cellName, cellValue) {
//     // You can do any validation on here for editing value,
//     // return false for reject the editing
//     return true;
// }
//
//
//
//     render(){
//         const cellEditProp = {
//             mode: 'click',
//             blurToSave: true,
//             beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
//             afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
//         };
//
//         const products=[{
//             id:0,
//             name:"sdfd",
//             price:32
//         }];
//
//
//         return(
//             <Well>
//                 <Row>
//                     <Col xs={12} >
//                         <Panel>
//                             <BootstrapTable data={ products } cellEdit={ cellEditProp }>
//                                 <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
//                                 <TableHeaderColumn dataField='name' editable={false}>Product Name</TableHeaderColumn>
//                                 <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
//                             </BootstrapTable>
//                         </Panel>
//                     </Col>
//                 </Row>
//             </Well>
//         )
//     }
// }
//
// export default AddComment;

import React,{Component} from 'react';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import {
    Well,
    Panel,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import axios from 'axios';

const selectRowProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
    afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

function onAfterSaveCell(row, cellName, cellValue) {
    alert(`Save cell ${cellName} with value ${cellValue}`);

    let rowStr = '';
    console.log('imgId----',row._id);
    for (const prop in row) {
        rowStr += prop + ': ' + row[prop] + '\n';
    }
    axios.post('http://localhost:4000/updatepost/'+row._id,{comment:cellValue})
        .then((res)=>{
            console.log('res-----',res)
        })
        .catch((err)=>{
            console.log('err-----',err)

        })
    alert('Thw whole row :\n' + rowStr);
}

function onBeforeSaveCell(row, cellName, cellValue) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
}

function onRowSelect(row, isSelected, e) {
    if (isSelected ) {
        const name=row.name;
        //  alert('The selection only work on key which less than 3',row.email);
        //return false;
    }
}
//selectRow={ selectRowProp }
class DisplayPost extends Component{
    constructor(props){
        super(props);
        this.state={posts:[]}
    }

    componentDidMount(){
        axios.get('http://localhost:4000/getAllPost')
            .then((res)=>{
                this.setState({posts:res.data.posts})
                console.log('respose---',this.state.posts);
            })
            .catch((err)=>{
                console.log('error---',err)
            })
    }

    handleRender(){
        this.props.history.push("/userdashboard");

    }

    render(){

        function imageFormatter(cell, row){
            return "<img style=width:20px src='"+cell+"' />" ;
        }
        const products=[{
            name:"dsf",
            email:"sdfd",
            image:"https://cdn4.iconfinder.com/data/icons/colicon/24/close_delete-128.png"
        }];


        return(
            <Well>
                <Row>
                    <Col xs={12} >
                        <Panel>
                            <BootstrapTable data={ this.state.posts } cellEdit={selectRowProp} >
                                <TableHeaderColumn dataField='_id' hidden={true} isKey >User ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='title' width='10%' editable={false}>Title</TableHeaderColumn>
                                <TableHeaderColumn dataField="description" width='50%' editable={false}>Description</TableHeaderColumn>
                                <TableHeaderColumn dataField="image" dataFormat={imageFormatter} editable={false}>Post Image</TableHeaderColumn>
                                <TableHeaderColumn dataField="like" width='5%' editable={false}>Like</TableHeaderColumn>
                                <TableHeaderColumn dataField="comment" width='50%' >Comment</TableHeaderColumn>

                            </BootstrapTable>
                            <Button bsStyle="warning" style={{marginLeft:"15px"}} onClick={this.handleRender.bind(this)}>
                                Back
                            </Button>
                        </Panel>
                    </Col>
                </Row>
            </Well>
        )
    }
}

export default DisplayPost;