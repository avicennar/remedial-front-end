import React, { Component } from 'react';
import axios from 'axios';


class MovieList extends Component {

    state = { movieList: [], addMovie: 'Masukkan nama film', editMovie: 'Masukkan nama film', selectedEditMovieID: 0 }
    
    componentDidMount() {
        axios.get('http://localhost:2000/listmovie')
        .then((res) => {
            this.setState({ movieList: res.data })
        })
    }

    onBtnAddClick = () => {
        if(document.getElementById("addMovie").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                nama: this.refs.AddNamaMovie.value,
                tahun: this.refs.AddTahunMovie.value,
                description: this.refs.AddDeskripsiMovie.value
            }

            if(document.getElementById('addMovie')){
                formData.append('nama', document.getElementById('addMovie').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post("http://localhost:1997/addmovie", formData, headers)
            .then((res) => {
                alert("Add Movie Success")
                this.setState({ brandList: res.data })
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else {
            alert('Masukkan Nama Film nya')
        }
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')) {
            axios.delete('http://localhost:2000/deletemovie/' + id)
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

    renderMovieList = () => {
        var listJSX = this.state.movieList.map((item) =>  {
            if(item.id === this.state.selectedEditBrandId) {
                return (
                    <tr>
                        <td></td>
                        <td><input type="text" ref="EditBrandName" defaultValue={item.nama} /></td>
                        <td><input type="text" id="EditBrandImage" name="EditBrandImage" label={this.state.EditBrandImage} onChange={this.onEditFileImageChange} /></td>
                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditBrandId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.tahun}</td>
                    <td>{item.description}</td>
                    <td><input type="button" class="btn btn-primary" value="Edit" onClick={() => this.setState({selectedEditMovieId:item.id})} /></td>
                    <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                </tr>
            )
        })
        return listJSX;
    }

    render() {
        return (
            <div>
                <center>
                    <h1>MOVIE LIST</h1>
                        <table>
                            <thead>
                                <tr>
                                <th>Id</th>
                                <th>Nama Film</th>
                                <th>Tahun</th>
                                <th>Deskripsi</th>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                        <tbody>
                            {this.renderMovieList()}                  
                        </tbody>
                        <tfoot>
                            <td></td>
                            <td><input type="text" ref="AddNamaMovie"/></td>
                            <td><input type="text" ref="AddTahunMovie"/></td>
                            <td><input type="text" ref="AddDeskripsiMovie"/></td>
                            <td><input type="button" class="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                            <td></td>
                        </tfoot>
                    </table>
                </center>
            </div> 
        )
    }
}


export default MovieList;
