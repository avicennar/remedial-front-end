import React, { Component } from 'react';
import axios from 'axios';

class ConnectionList extends Component {

    state = { connList: []  }

    componentDidMount() {
        axios.get('http://localhost:2000/allconnlist')
        .then((res) => {
            this.setState({ connList: res.data })
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')) {
            axios.delete('http://localhost:2000/deleteconnlist/' + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ connList: res.data })
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    onBtnAddClick = () => {
        if(document.getElementById("addConnection").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                nama: this.refs.AddConnection.value,
            }

            if(document.getElementById('addConnection')){
                formData.append('nama', document.getElementById('addConnection').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post("http://localhost:2000/addconnection", formData, headers)
            .then((res) => {
                alert("Add Connection Success")
                this.setState({ connList: res.data })
            })
            .catch((err) =>{
                console.log(err)
            })
        }
    }

    renderConnList= () => {
        var listJSX = this.state.connList.map((item) => {
            return(
                <tr>
                    <td>{item.namaFilm}</td>
                    <td>{item.namaKategori}</td>
                    <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                </tr>
            )
        })
        return listJSX;
    }

    render () {
        return (
            <div>
                <center>
                    <h1>CONNECTION LIST</h1>
                        <table>
                            <thead> 
                               <th>Nama Movie</th>
                               <th>Kategori</th>
                               <th></th>
                            </thead>
                        <tbody>
                            {this.renderConnList()}
                        </tbody>
                            <tfoot>
                                <td><input type="text" ref="AddNamaFilm"/></td>
                                <td><input type="text" ref="AddNamaKategori"/></td>
                                <td><input type="button" class="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                            </tfoot>
                        </table>
                </center>
            </div>
        )
    }
}

export default ConnectionList;