import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const ViewRecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

    const fetchRecords = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/maintenance');
            setRecords(data || []);
        } catch (err) {
            console.error('Error:', err);
            setError('Error fetching records');
        }
    };    

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this record? This process cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/maintenance/${id}`);
                setRecords(records.filter(record => record._id !== id)); 
                Swal.fire(
                    'Deleted!',
                    'The record has been deleted.',
                    'success'
                );
            } catch (err) {
                console.error('Error deleting record:', err);
                setError('Error deleting record');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Maintenance Records</h1>
            {error && <p className="text-danger">{error}</p>}
            {records && records.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Car Number</th>
                            <th scope="col">Car Color</th>
                            <th scope="col">Car Model</th>
                            <th scope="col">Work Description</th>
                            <th scope="col">Payment Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record._id}>
                                <td>{record.carDetails.number}</td>
                                <td>{record.carDetails.color}</td>
                                <td>{record.carDetails.model}</td>
                                <td>{record.workDescription}</td>
                                <td>
                                    {record.paymentStatus.received ? `Received (${record.paymentStatus.paymentMethod})` : 'Not Received'}
                                </td>
                                <td>
                                    <Link to={`/edit/${record._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(record._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No records found.</p>
            )}
            {/* Add Record Button */}
            <div className="d-flex justify-content-center mt-4">
                <Link to="/add" className="btn btn-lg btn-success shadow">
                    + Add New Record
                </Link>
            </div>
        </div>
    );
};

export default ViewRecordsPage;
