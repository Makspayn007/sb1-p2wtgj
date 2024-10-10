import { Feedback, departments } from '../types';

const generateRandomFeedback = (count: number): Feedback[] => {
  const feedback: Feedback[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    feedback.push({
      id: `feedback-${i + 1}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      problem: `Проблема ${i + 1}`,
      solution: `Рішення ${i + 1}`,
      timestamp: now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000), // Random timestamp within the last 30 days
    });
  }

  return feedback;
};

export default generateRandomFeedback;