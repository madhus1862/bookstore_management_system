//react hooks--methods
// useref-mutuable reference object to interact with dom elements
import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './face.css';

const FaceRecognition = () => {
  const cameraRef = useRef(null);
  const photoCanvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [name, setName] = useState(''); // State for the name field

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('rollNumber') || queryParams.get('facultyID');
  const isFaculty = queryParams.has('isFaculty'); 

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    setAttendanceRecords(storedRecords);
  }, []);

  useEffect(() => {
    // Set the name from the URL query parameter
    const queryName = queryParams.get('name');
    if (queryName) {
      setName(decodeURIComponent(queryName));
    }

    // Start the webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (cameraRef.current) {
          cameraRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Error accessing webcam:', err));
  }, [queryParams]);

  const capturePhoto = () => {
    const camera = cameraRef.current;
    const photoCanvas = photoCanvasRef.current;
    const context = photoCanvas.getContext('2d');

    if (camera && camera.videoWidth && camera.videoHeight) {
      photoCanvas.width = camera.videoWidth;
      photoCanvas.height = camera.videoHeight;
      context.drawImage(camera, 0, 0, camera.videoWidth, camera.videoHeight);

      const imageData = photoCanvas.toDataURL('image/png');
      setCapturedImage(imageData);

      const newRecord = {
        id: id || 'N/A',
        name: name || 'N/A', // Use the updated name
        role: isFaculty ? 'Faculty' : 'Student',
        status: 'Present',
        timestamp: new Date().toLocaleString(),
        photoData: imageData,
      };

      let existingRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
      const existingRecordIndex = existingRecords.findIndex(record => record.id === newRecord.id);

      if (existingRecordIndex >= 0) {
        existingRecords[existingRecordIndex] = newRecord;
      } else {
        existingRecords.push(newRecord);
      }

      try {
        localStorage.setItem('attendanceRecords', JSON.stringify(existingRecords));
        setAttendanceRecords(existingRecords); 
        alert(`${isFaculty ? 'Faculty' : 'Student'} ID: ${id} with name ${name} is marked Present!`);
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          console.error("Storage quota exceeded.");
          localStorage.clear();
        } else {
          console.error("Error saving data:", e);
        }
      }
    }
  };

  const exportToExcel = () => {
    const data = attendanceRecords.map(record => ({
      ID: record.id,
      Name: record.name, 
      Role: record.role,
      Status: record.status,
      Timestamp: record.timestamp,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Records');

    XLSX.writeFile(workbook, 'AttendanceRecords.xlsx');
    alert('Attendance records have been exported to Excel!');
  };

  return (
    <div className="face-recognition-container">
      <h2>{isFaculty ? 'Faculty' : 'Student'} Face Recognition Capture</h2>
      <video ref={cameraRef} autoPlay playsInline></video>
      <button onClick={capturePhoto}>Capture Photo</button>

      <canvas ref={photoCanvasRef} style={{ display: 'none' }}></canvas>

      {capturedImage && <img src={capturedImage} alt="Captured" />}

      <h3>Attendance Records</h3>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Time</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.role}</td>
              <td>{record.status}</td>
              <td>{record.timestamp}</td>
              <td><img src={record.photoData} alt={`Capture ${index + 1}`} style={{ width: '100px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default FaceRecognition;
