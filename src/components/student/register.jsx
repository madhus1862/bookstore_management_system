import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerstyle.css';

function StudRegister() {
  const [fullName, setFullName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleFaceCapture = async () => {
    if (!enrollmentNo || !fullName) {
      alert('Please fill in both the Roll Number and Full Name!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          enrollmentNo,
          email,
          department,
          semester,
          gender,
          phoneNumber,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Student details saved successfully!');
        navigate(
          `/FaceRecognition?rollNumber=${enrollmentNo}&name=${encodeURIComponent(
            fullName
          )}`
        );
      } else {
        setError(data.message || 'Failed to save student details');
      }
    } catch (error) {
      setError('Error occurred while saving student details');
    }
  };

  return (
    <div className="body">
      <div className="container">
        <h2>Student Registration Form</h2>
        {error && <p className="error">{error}</p>}
        <form>
          <div className="form-group">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            /><br />

            <label htmlFor="enrollment-no">Roll Number</label>
            <input
              type="text"
              id="enrollment-no"
              value={enrollmentNo}
              onChange={(e) => setEnrollmentNo(e.target.value)}
              required
            /><br />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br />

            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            /><br />

            <label htmlFor="semester">Semester</label>
            <input
              type="text"
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            /><br />

            <label>Gender:</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select><br />

            <label htmlFor="phonenumber">Phone Number</label>
            <input
              type="text"
              id="phonenumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            /><br />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br />

            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            /><br />
          </div>

          <div className="form-group">
            <button
              type="button"
              onClick={handleFaceCapture}
            >
              Face Capture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudRegister;
