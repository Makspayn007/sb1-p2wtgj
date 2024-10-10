import { Feedback, CommunicationRating } from '../types';

export const saveFeedbackToLocalStorage = (feedback: Feedback[]): void => {
  localStorage.setItem('feedback', JSON.stringify(feedback));
};

export const getFeedbackFromLocalStorage = (): Feedback[] => {
  const storedFeedback = localStorage.getItem('feedback');
  return storedFeedback ? JSON.parse(storedFeedback) : [];
};

export const saveCommunicationRatingsToLocalStorage = (ratings: CommunicationRating[]): void => {
  localStorage.setItem('communicationRatings', JSON.stringify(ratings));
};

export const getCommunicationRatingsFromLocalStorage = (): CommunicationRating[] => {
  const storedRatings = localStorage.getItem('communicationRatings');
  return storedRatings ? JSON.parse(storedRatings) : [];
};