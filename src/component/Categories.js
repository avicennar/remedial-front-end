import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {

    state = {categoryList: [], selectedEditCategoryId:0}

    componentDidMount() {
        axios.get('http://localhost:2000/listkategori')
        .then((res) => {
            this.setState({ categoryList: res.data })
        })
    }

    onBtnAddClick = () => {
        if(document.getElementById("addKategori").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                nama: this.refs.AddNamaKategori.value,
            }

            if(document.getElementById('addKategori')){
                formData.append('nama', document.getElementById('addKategori').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post("http://localhost:2000/addkategori", formData, headers)
            .then((res) => {
                alert("Add Category Success")
                this.setState({ brandList: res.data })
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else {
            alert('Masukkan kategori filmnya')
        }
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')) {
            axios.delete('http://localhost:2000/deletekategori/' + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ movieList: res.data })
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    renderCategoryList = () => {
        var listJSX = this.state.categoryList.map((item) => {
            if(item.id === this.state.selectedEditCategoryId) {
                return (
                    <tr>
                        <td></td>
                        <td><input type="text" ref="EditCategory" defaultValue={item.nama}/></td>
                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditBrandId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
                    </tr>
                )
            }
            return(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td><input type="button" class="btn btn-primary" value="Edit" onClick={() => this.setState({selectedEditBrandId:item.id})} /></td>
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
                    <h1>CATEGORY LIST</h1>
                        <table>
                            <thead> 
                               <th>Id</th>
                               <th>Nama</th>
                               <th></th>
                               <th></th>
                            </thead>
                        <tbody>
                            {this.renderCategoryList()}
                        </tbody>
                            <tfoot>
                                <td></td>
                                <td><input type="text" ref="AddCategory"/></td>
                                <td><input type="button" class="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                                <td></td>
                            </tfoot>
                        </table>
                </center>
            </div>
        )
    }

}

export default Categories;