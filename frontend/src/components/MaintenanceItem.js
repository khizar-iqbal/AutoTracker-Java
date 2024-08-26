import React from 'react';
import axios from 'axios';
import './styles/List.css';

const MaintenanceItem = ({ record, fetchRecords }) => {
    const deleteRecord = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/maintenance/${record._id}`);
            fetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    return (
        <div className="list-item">
            <div>
                <h4>{record.carDetails.number} ({record.carDetails.model}, {record.carDetails.color})</h4>
                <p>Description: {record.workDescription}</p>
                <p>Payment: {record.paymentStatus.received ? 'Received' : 'Not Received'} ({record.paymentStatus.paymentMethod})</p>
                <p>Receipt: {record.receipt}</p>
            </div>
            <button onClick={deleteRecord}>Delete</button>
        </div>
    );
};

export default MaintenanceItem;
