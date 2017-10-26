import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
    Well,
    Panel,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import axios from 'axios';

const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
    afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};
function onAfterSaveCell(row, cellName, cellValue) {
    alert(`Save cell ${cellName} with value ${cellValue}`);

    let rowStr = '';
    console.log('id-----',row._id)
    const url = 'http://localhost:4000/makeverifiedcomment/'+row._id;
    for (const prop in row) {
        rowStr += prop + ': ' + row[prop] + '\n';
    }
    axios.post(url)
        .then((res) => {

            console.log(res);
        })
        .catch((err) => {

            console.log(err);
        })
    alert('Thw whole row :\n' + rowStr);
    window.location.reload();

}

function onBeforeSaveCell(row, cellName, cellValue) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    console.log('-----',cellValue)
    return true;
}

function showDescription(cell, row) {
    return cell.name;
}


class DisplayPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            delcomment:'delete',
            selected: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/getusercomment')
            .then((res) => {
                this.setState({comments: res.data.comments})
                console.log('respose---', this.state.comments);
            })
            .catch((err) => {
                console.log('error---', err)
            })
    }
    onRowSelect(row, isSelected){
        if (isSelected) {
            this.state.selected.push(row._id);
        } else {
            let index = this.state.selected.indexOf(row);
            if (index !== -1) this.state.selected.splice(index, 1);
        }
    }
    handleRender() {
        this.props.history.push("/userdashboard");

    }

    getId(){
        const obj={
            selectedId:this.state.selected
        }
        console.log('id--->',obj)
        const url = 'http://localhost:4000/deletecomment';
        axios.post(url, obj)
            .then((res) => {
                debugger
                console.log('comment-----', res.data);
                // this.setState({user:res.data.user[0]})
                // console.log(this.state.user);

            })
            .catch((err) => {

                console.log(err);
            })
    }

    render() {
        var selectRowProp = {
            mode: "checkbox",
            width: "40px",
            bgColor: "rgb(206, 206, 206)",
            onSelect: this.onRowSelect.bind(this)
        };

       return (
            <Well>
                <Row>
                    <Col xs={12}>
                        <Panel>


                            <BootstrapTable data={ this.state.comments } selectRow={selectRowProp}cellEdit={ cellEditProp } >
                                <TableHeaderColumn dataField='_id' hidden={true} isKey>Comment ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='frdId' dataFormat={showDescription} width='20%' editable={false}>Post Upload By</TableHeaderColumn>
                                <TableHeaderColumn dataField="userId" dataFormat={showDescription} width='20%' editable={false}>On Post Comment By </TableHeaderColumn>
                                <TableHeaderColumn dataField="comment" width='50%' editable={false}>Comment</TableHeaderColumn>
                                <TableHeaderColumn dataField="isApprove" width='10%'>Approve</TableHeaderColumn>

                            </BootstrapTable>
                            <Button bsStyle="warning" style={{marginLeft: "15px"}}
                                    onClick={this.handleRender.bind(this)}>
                                Back
                            </Button>
                            <Button bsStyle="danger" style={{marginLeft: "15px"}}
                                    onClick={this.getId.bind(this)}>
                                Delete
                            </Button>
                        </Panel>
                    </Col>
                </Row>
            </Well>
        )
    }
}

export default DisplayPost;