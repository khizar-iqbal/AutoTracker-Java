import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewRecordsPage from './components/ViewRecordsPage';
import MaintenanceForm from './components/MaintenanceForm';
import EditRecordPage from './components/EditRecordPage';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

    const fetchRecords = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/maintenance');
            setRecords(data.records);
        } catch (err) {
            setError('Error fetching records');
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <Router>
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<ViewRecordsPage records={records} fetchRecords={fetchRecords} />} />
                    <Route path="/add" element={<MaintenanceForm fetchRecords={fetchRecords} />} />
                    <Route path="/edit/:id" element={<EditRecordPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
