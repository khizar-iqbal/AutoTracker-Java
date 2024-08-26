import React from 'react';
import MaintenanceItem from './MaintenanceItem';
import './styles/List.css';

const MaintenanceList = ({ records, fetchRecords }) => {
    return (
        <div className="list-container">
            <h3>Maintenance Records</h3>
            {records.length > 0 ? (
                records.map((record) => (
                    <MaintenanceItem key={record._id} record={record} fetchRecords={fetchRecords} />
                ))
            ) : (
                <p>No records found.</p>
            )}
        </div>
    );
};

export default MaintenanceList;
