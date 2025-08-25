import React, { useState } from 'react';

const LeaveTypeSelector = ({ onLeaveTypeSelect }) => {
  const [selectedLeaveType, setSelectedLeaveType] = useState('annual');

  const leaveTypes = [
    { id: 'annual', label: 'Annual Leave', value: 'annual' },
    { id: 'parental', label: 'Parental Leave', value: 'parental' },
    { id: 'long-service', label: 'Long Service Leave', value: 'long-service' },
    { id: 'sick', label: 'Sick Leave', value: 'sick' },
    { id: 'unpaid', label: 'Unpaid Leave', value: 'unpaid' }
  ];

  const handleSubmit = () => {
    if (selectedLeaveType) {
      onLeaveTypeSelect(selectedLeaveType);
    }
  };

  return (
    <div className="message-content leave-type-selector">
      <div className="leave-type-options">
        {leaveTypes.map((leaveType) => (
          <label key={leaveType.id} className="leave-type-option">
            <input
              type="radio"
              name="leaveType"
              value={leaveType.value}
              checked={selectedLeaveType === leaveType.value}
              onChange={(e) => setSelectedLeaveType(e.target.value)}
            />
            <span className="radio-label">{leaveType.label}</span>
          </label>
        ))}
      </div>
      <button 
        className="submit-leave-type"
        onClick={handleSubmit}
        disabled={!selectedLeaveType}
      >
        Submit
      </button>
    </div>
  );
};

export default LeaveTypeSelector;
