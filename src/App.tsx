import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Feedback, Department } from './types';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import DepartmentFilter from './components/DepartmentFilter';
import ProgressTracker from './components/ProgressTracker';
import { saveFeedbackToLocalStorage, getFeedbackFromLocalStorage } from './utils/localStorage';
import generateRandomFeedback from './utils/generateRandomFeedback';
import { MessageSquare, Plus, X, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | 'all'>('all');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const storedFeedback = getFeedbackFromLocalStorage();
    if (storedFeedback.length === 0) {
      const initialFeedback = generateRandomFeedback(100);
      setFeedback(initialFeedback);
      saveFeedbackToLocalStorage(initialFeedback);
    } else {
      setFeedback(storedFeedback);
    }
  }, []);

  const handleSubmit = useCallback((department: Department, problem: string, solution: string, isAnonymous: boolean) => {
    const newFeedback: Feedback = {
      id: `feedback-${Date.now()}`,
      department,
      problem,
      solution,
      timestamp: Date.now(),
      isAnonymous,
    };
    const updatedFeedback = [newFeedback, ...feedback];
    setFeedback(updatedFeedback);
    saveFeedbackToLocalStorage(updatedFeedback);
    setCurrentPage(1);
    setIsFormVisible(false);
    setNotifications([`Новий відгук додано для відділу ${department}`, ...notifications]);
  }, [feedback, notifications]);

  const filteredFeedback = useMemo(() => {
    return selectedDepartment === 'all'
      ? feedback
      : feedback.filter((item) => item.department === selectedDepartment);
  }, [feedback, selectedDepartment]);

  const sortedFeedback = useMemo(() => {
    return [...filteredFeedback].sort((a, b) => b.timestamp - a.timestamp);
  }, [filteredFeedback]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleDepartmentChange = useCallback((department: Department | 'all') => {
    setSelectedDepartment(department);
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Приходько та партнери</h1>
              <p className="mt-2 text-xl">Наш дружній канал зворотного зв'язку</p>
            </div>
            <div className="relative">
              <Bell className="h-6 w-6 cursor-pointer" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="card p-6">
            <ProgressTracker feedback={feedback} />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <DepartmentFilter
                selectedDepartment={selectedDepartment}
                onDepartmentChange={handleDepartmentChange}
              />
              <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="btn-primary"
              >
                {isFormVisible ? (
                  <>
                    <X className="mr-2 h-5 w-5" />
                    Закрити
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    Додати відгук
                  </>
                )}
              </button>
            </div>
            {isFormVisible && (
              <div className="mb-8 animate-fade-in">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Поділитися думкою
                </h3>
                <FeedbackForm onSubmit={handleSubmit} />
              </div>
            )}
            <FeedbackList
              feedback={sortedFeedback}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;