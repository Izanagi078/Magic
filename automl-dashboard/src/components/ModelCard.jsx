import React from 'react';

const ModelCard = ({ modelName, accuracy, executionTime, memoryUsage }) => {
  return (
    <div className="model-card">
      <h3>{modelName}</h3>
      <ul>
        <li>Accuracy: {accuracy}%</li>
        <li>Execution Time: {executionTime}ms</li>
        <li>Memory Usage: {memoryUsage}MB</li>
      </ul>
    </div>
  );
};

export default ModelCard;
