import React from 'react';
import { Feedback } from '../types';

interface ProgressTrackerProps {
  feedback: Feedback[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ feedback }) => {
  const totalFeedback = feedback.length;

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-gray-100">Статистика зворотного зв'язку</h3>
      <p className="text-3xl font-bold text-primary dark:text-blue-400">{totalFeedback}</p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Загальна кількість відгуків
      </p>
    </div>
  );
};

export default ProgressTracker;