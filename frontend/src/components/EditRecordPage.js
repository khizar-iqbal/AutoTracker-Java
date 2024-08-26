import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/EditRecordPage.css';

const EditRecordPage = () => {
    const { id } = useParams(); // Get the record ID from the URL
    const navigate = useNavigate(); // To navigate back after saving
    const [carDetails, setCarDetails] = useState({ number: '', color: '', model: '' });
    const [workDescription, setWorkDescription] = useState('');
    const [paymentStatus, setPaymentStatus] = useState({ received: false, paymentMethod: 'Cash' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch the specific record to edit
        const fetchRecord = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/maintenance/${id}`);
                setCarDetails(data.carDetails);
                setWorkDescription(data.workDescription);
                setPaymentStatus(data.paymentStatus);
            } catch (err) {
                setError('Error fetching record');
            }
        };
        fetchRecord();
    }, [id]);

    const validateForm = () => {
        const carNumberPattern = /^[A-Za-z]+-[0-9]+$/;
        const carColorPattern = /^[A-Za-z]+$/;
        const carModelPattern = /^[A-Za-z]+$/;

        if (!carNumberPattern.test(carDetails.number)) {
            setError('Car number must contain letters followed by numbers with a hyphen in between.');
            return false;
        }

        if (!carColorPattern.test(carDetails.color)) {
            setError('Car color can only contain alphabets.');
            return false;
        }

        if (!carModelPattern.test(carDetails.model)) {
            setError('Car model can only contain alphabets.');
            return false;
        }

        if (workDescription.trim().split(/\s+/).length < 1) {
            setError('Work description must contain at least one word.');
            return false;
        }

        setError('');
        return true;
    };

    const handleCarNumberChange = (e) => {
        let value = e.target.value.toUpperCase(); // Convert to uppercase
        value = value.replace(/[^A-Za-z0-9]/g, ''); // Remove all non-alphanumeric characters
        if (/[A-Za-z]+[0-9]+/.test(value)) {
            value = value.replace(/([A-Za-z]+)([0-9]+)/, '$1-$2'); // Add hyphen between letters and numbers
        }
        setCarDetails({ ...carDetails, number: value });
    };

    const handleInputChange = (field, value) => {
        const capitalizedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
        setCarDetails({ ...carDetails, [field]: capitalizedValue });
    };

    const handleWorkDescriptionChange = (value) => {
        const capitalizedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
        setWorkDescription(capitalizedValue);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const updatedRecord = { carDetails, workDescription, paymentStatus };
            await axios.put(`http://localhost:5000/api/maintenance/${id}`, updatedRecord);
            setSuccess('Record updated successfully');
            setTimeout(() => {
                navigate('/'); // Redirect back to the records page after saving
            }, 1000);
        } catch (error) {
            setError('Error updating record');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-primary mb-4">Edit Maintenance Record</h2>
                <form onSubmit={submitHandler}>
                    {error && <p className="alert alert-danger">{error}</p>}
                    {success && <p className="alert alert-success">{success}</p>}
                    <div className="mb-3">
                        <label className="form-label">Car Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={carDetails.number}
                            onChange={handleCarNumberChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Car Color</label>
                        <input
                            type="text"
                            className="form-control"
                            value={carDetails.color}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Car Model</label>
                        <input
                            type="text"
                            className="form-control"
                            value={carDetails.model}
                            onChange={(e) => handleInputChange('model', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Work Description</label>
                        <textarea
                            className="form-control"
                            value={workDescription}
                            onChange={(e) => handleWorkDescriptionChange(e.target.value)}
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={paymentStatus.received}
                            onChange={(e) => setPaymentStatus({ ...paymentStatus, received: e.target.checked })}
                        />
                        <label className="form-check-label">Payment Received</label>
                    </div>
                    {paymentStatus.received && (
                        <div className="mb-3">
                            <label className="form-label">Payment Method</label>
                            <select
                                className="form-select"
                                value={paymentStatus.paymentMethod}
                                onChange={(e) => setPaymentStatus({ ...paymentStatus, paymentMethod: e.target.value })}
                            >
                                <option value="Cash">Cash</option>
                                <option value="Card">Card</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100 btn-lg">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditRecordPage;
