import React from 'react';

const HeaderLayout = (props) => {
    return (
        <header className="container">
            <h1>{props.title}</h1>
        </header>
        )
    }



const FooterLayout = () => (
    <footer className="Footer">
        <h3>Admin page</h3>
    </footer>
    );

    export {
        HeaderLayout,
        FooterLayout,
      }