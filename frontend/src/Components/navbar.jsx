import React from 'react';
import "./navbar.css";

const Navbar = () => {

    return (
        <nav className="navbar">
            <h1 className="title">To Do</h1>
            <ul className="options">
                <li>Sort</li>
                <li>Edit</li>
                <li>Add</li>
            </ul>
        </nav>
    );

};

export default Navbar;