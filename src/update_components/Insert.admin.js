import React, { Component } from 'react';
import './style.css';

export default class Insert extends Component {
    componentDidMount() {
        const categories = document.getElementById('options');
        fetch('/api/categories')
        .then(res => res.json())
        .then(data => {
        let html = '';
        data.forEach(data => {
            html += `
            <option value="${data._id}">
            ${data.name}
            </option>`
        });
        categories.innerHTML = html;
        })
        .catch(() => alert('Can\'t get categories from server!'));

        document.querySelector('.myForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryId = categories.options[categories.selectedIndex].value;
        const title = document.getElementById('title').value;
        const pdfName = document.getElementById('pdf').value;
        const header = document.getElementById('header').value;
        console.log(title + " " + categoryId + " " + pdfName);
        if(title.length > 0 && pdfName.length > 0 && categoryId.length > 0) {
            alert('PDF is added!');
            fetch(`/api/tests/add/${title}/${pdfName}/${categoryId}/${header}`, {
            method: "POST"
            }).then(res => alert('Added'));
        } else {
            alert('Place all values')
        }
        });

        document.querySelector('.myForm2').addEventListener('submit', (e) => {
        e.preventDefault();
        const category_name = document.getElementById('category_name').value;
        if(category_name.length > 2) {
            fetch(`/api/category/add/${category_name}`, {
            method: "POST"
            }).then(res => alert('Added'));
        } else {
            alert('Category name length should be more than 2!')
        }
        });

        fetch('/api/tests')
        .then(res => res.json())
        .then(data => {
        let output = '' 
        data.forEach(d => {
            output += `
                <option value="${d._id}">${d.title}</option>
            `
        })
        document.getElementById('tests_select').innerHTML = output;
        })
        .catch(res => console.log(res))
        document.querySelector('.myForm3').addEventListener('submit', (e) => {
            const title = document.getElementById('updated_title_input').value;
            const id = document.getElementById('tests_select').options[document.getElementById('tests_select').selectedIndex].value;
            if(title.length > 1) {
              if(window.confirm('Are you sure?')) {
                fetch(`/api/tests/update/${id}/${title}`, {
                  method: 'POST'
                })
                .res(d => alert('Title Updated!'))
                .catch(e => alert(e));
              }
            } else {
              alert('Title is too short!')
            }
            e.preventDefault()
          })
          document.querySelector('.myForm4').addEventListener('submit', (e) => {
             console.log("fff");   

          }); 
    }
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Insert Form</h1>
                </div>
                <div className="container">
                    <br />
                    <h1>Upload pdf to server</h1>
                    <form style={{textAlign: 'center'}} method="POST" action="/api/upload" enctype="multipart/form-data">
                        <input type="file" name="avatar" />  
                        <br /><br />
                        <input className="btn btn-primary" style={{width: '100%'}} type="submit" value="Upload" />
                    </form>
                    <hr />
                    <h1>1. Put your pdf information to database</h1>
                    <h2>Steps:</h2>
                    <ol>
                    <li>Add a .pdf file to your server</li>
                    <li>Get the filename from the json after, and put it to Name input</li>
                    </ol>
                    <form className="myForm">
                        <br />
                        <h5>Pdf Name(without the .pdf, and should be the same name that the pdf u uploaded had)</h5>
                        <input className="form-control" id="pdf" placeholder="PDF: " />
                        <br />
                        <h5>Title: </h5>
                        <input className="form-control" id="title" placeholder="Title: " />
                        <br />
                        <h5>Header</h5>
                        <input className="form-control" id="header" placeholder="Header: " />
                        <br />
                        <h5>Category</h5>
                        <select className="form-control" id="options" name="Title: " >
                        </select>
                        <br />
                        <input type="submit" value="Submit" className="btn btn-primary" style={{width: '100%'}} />
                    </form>
                    <hr />
                    <br />
                    <h1>2. Add a category</h1>
                    <form className="myForm2">
                        <br />
                        <h5>Category Name</h5>
                        <input className="form-control" id="category_name" placeholder="Category Name: " />
                        <br />
                        <input type="submit" value="Submit" className="btn btn-primary" style={{width: '100%'}} />
                    </form>
                    <br /><hr />
                    <h1>3. Update the test title</h1>
                    <form class="myForm3">
                        <select className="form-control" id="tests_select"></select>
                        <br />
                        <input type="text" id="updated_title_input" placeholder="Title: " class="form-control" />
                        <br />
                        <input type="submit" class="btn btn-primary" style={{width: '100%'}} value="Update" />
                    </form>
                    <br /><br />
                    <h1>3. Meta information</h1>
                    <form className="myForm4">
                        <input className="form-control" id="Keywords"></input>
                        <br />
                        <input type="textarea" id="metaDesc" placeholder="Description: " class="form-control" />
                        <br />
                        <input type="submit" class="btn btn-primary" style={{width: '100%'}} value="Update" />
                    </form>
                </div>
            </div>
        )
    }
}