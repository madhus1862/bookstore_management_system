import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './facultyregister.css'; // Ensure this CSS file exists and is styled correctly

function FacultyRegister() {
    const [fullName, setFullName] = useState('');
    const [facultyID, setFacultyID] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Initialize navigate for routing

    const handleFaceCapture = async () => {
        if (!facultyID || !fullName) {
            alert('Please fill in both Faculty ID and Full Name!');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            // Save faculty details to the backend
            const response = await fetch('http://localhost:5000/api/faculties/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName,
                    facultyID,
                    email,
                    department,
                    phoneNumber,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || 'Faculty details saved successfully!');

                // Navigate to the FaceRecognition page
                navigate(
                    `/FaceRecognition?facultyID=${facultyID}&name=${encodeURIComponent(
                        fullName
                    )}&isFaculty=true`
                );
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to save faculty details');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while connecting to the server.');
        }
    };

    return (
        <div className="body">
            <div className="container">
                <h2>Faculty Registration Form</h2>
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
                        />
                        <br />

                        <label htmlFor="faculty-id">Faculty ID</label>
                        <input
                            type="text"
                            id="faculty-id"
                            value={facultyID}
                            onChange={(e) => setFacultyID(e.target.value)}
                            required
                        />
                        <br />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br />

                        <label htmlFor="department">Department</label>
                        <input
                            type="text"
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        />
                        <br />

                        <label htmlFor="phone-number">Phone Number</label>
                        <input
                            type="text"
                            id="phone-number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <br />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <br />
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={handleFaceCapture}>
                            Face Capture
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FacultyRegister;
