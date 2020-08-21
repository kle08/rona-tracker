import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function Nav() {
  return (
    <nav>
      <div>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to='/'>
          <h1>Covid-19 Tracker</h1>
        </Link>
      </div>
      <ul className='nav-links'>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to='/'>
          <li>Home</li>
        </Link>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to='/information'>
          <li>Information</li>
        </Link>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to='/news'>
          <li>News</li>
        </Link>
      </ul>
    </nav>
  )
}
