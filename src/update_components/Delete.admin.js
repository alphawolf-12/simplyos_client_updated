import React, { Component } from 'react';
import './style.css';

export default class Delete extends Component {
    componentDidMount() {
        const categories = document.getElementById('categories');
        const tests = document.getElementById('tests');
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

        fetch('/api/tests')
        .then(res => res.json())
        .then(data => {
        let html = '';
        data.forEach(data => {
            html += `
            <option value="${data._id}">
            ${data.title}
            </option>`
        });
        tests.innerHTML = html;
        })
        .catch(() => alert('Can\'t get categories from server!'));

        document.getElementById('del_cat').addEventListener('click', () => {
        if(window.confirm('Are you sure?')) {
            fetch(`/api/deleteCategory/${categories.options[categories.selectedIndex].value}`, {
            method: "POST"
            }).then(res => {
                alert('Category Deleted');
                window.location.reload();
            });
        }
        })

        document.getElementById('del_test').addEventListener('click', () => {
        if(window.confirm('Are you sure?')) {
            fetch(`/api/deleteTest/${tests.options[tests.selectedIndex].value}`, {
            method: "POST"
            }).then(res => {
                window.location.reload();
                alert('Test Deleted')
            });
        }
        })
    }
    render() {
        return (
            <div>
                 <div class="header">
                    <h1>Delete Form</h1>
                </div>
                <div class="container">
                <br />
                    <h1>Delete Category</h1>
                    <select id="categories" class="form-control"> </select>
                    <button id="del_cat" style={{marginTop: 10, width: "100%"}} className="btn btn-danger">Delete Category</button>
                    <br /><hr />
                    <h1>Delete Test</h1>
                    <select id="tests" class="form-control"> </select>
                    <button id="del_test" style={{marginTop: 10, width: "100%"}} className="btn btn-danger">Delete Test</button>
                    <br /><br />
                </div>
            </div>
        )
    }
}