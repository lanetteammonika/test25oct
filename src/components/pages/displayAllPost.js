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

//selectRow={ selectRowProp }
class DisplayPost extends Component {
    constructor(props) {
        super(props);
        this.state = {comments: []}
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

    handleRender() {
        this.props.history.push("/userdashboard");

    }

    render() {

        function imageFormatter(cell, row) {
            return "<img style=width:20px src='" + cell + "' />";
        }

        const products = [
            {
                email: "sdfd",
                image: "https://cdn4.iconfinder.com/data/icons/colicon/24/close_delete-128.png",
                name: {
                    _id: 1,
                    nam: "sdfcdsf"
                }

            }
        ];


        return (
            <Well>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <BootstrapTable data={ this.state.comments } cellEdit={ cellEditProp } >
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
                        </Panel>
                    </Col>
                </Row>
            </Well>
        )
    }
}

export default DisplayPost;