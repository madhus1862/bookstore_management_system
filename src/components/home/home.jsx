import React from 'react';
import  './style.css';
import studentimg from './student.jpg';
import {Link} from 'react-router-dom';
function AttendanceSystem() {
  return (
    <div>
      <header>
        <h1>Smart Classroom Management System</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
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
      <div className='herosection'>
         
      <div class="img">
        <img src={studentimg} />
      </div>
      <div className='herosection-text'>
        <h1>SMART CLASSROOM ATTENDANCE SYSTEM</h1> 
        <p>The attendance automation feature using facial recognition falls under the category of machine learning (ML) and computer vision.</p>
        <p>Use facial recognition algorithms or mobile app-based check-ins to automatically record student attendance. </p>
      </div>
      </div>
    </div>
  );
}

export default AttendanceSystem;