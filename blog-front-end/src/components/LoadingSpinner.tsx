import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  text: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default LoadingSpinner;
