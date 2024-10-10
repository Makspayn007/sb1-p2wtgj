import React, { useMemo } from 'react';
import { Feedback } from '../types';
import FeedbackItem from './FeedbackItem';
import Pagination from './Pagination';

interface FeedbackListProps {
  feedback: Feedback[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showPagination: boolean;
}

const FeedbackList: React.FC<FeedbackListProps> = React.memo(({
  feedback,
  currentPage,
  itemsPerPage,
  onPageChange,
  showPagination,
}) => {
  const paginatedFeedback = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return feedback.slice(startIndex, startIndex + itemsPerPage);
  }, [feedback, currentPage, itemsPerPage]);

  return (
    <div>
      {paginatedFeedback.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalItems={feedback.length}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
});

FeedbackList.displayName = 'FeedbackList';

export default FeedbackList;