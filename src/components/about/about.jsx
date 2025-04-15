import React from 'react';
import './about.css';
import aboutimg from './about.jpg';
import {Link} from 'react-router-dom';
function About(){
  return(
    <div>
      <header>
        <h1>Smart Classroom Management System</h1>
      </header>
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/service">Services</a></li>
          <li className="dropdown">
            <a href="#login">Login</a>
            <ul className="sub-menu">
              <li><Link to="/studregister">Student Login</Link></li>
              <li><Link to="/facultyregister">Faculty Login</Link></li>
              <li><a href="#">Admin Login</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className='aboutsection'>
        <div class="img">
          <img src = {aboutimg}/>
        </div>
        <div className='aboutsection-text'>
          <h1>FACE RECOGNITION BASED ATTENDANCE</h1><br/>
          <p>A system for folding and recognizing human face fast and precisely for attendance.</p>
          <h3>Face Scanning</h3><br />
          <p>Scan the faces of student and attendance will be marked.</p><br />
          <h3>User Friendly</h3><br />
          <p>  Easily accessible and understandable to the user of our system.</p>
        </div>
      </div>
    </div>
  );
}
export default About;
