import React, { useState } from 'react';
import { Feedback } from '../types';
import { ChevronDown, ChevronUp, Tag } from 'lucide-react';

interface FeedbackItemProps {
  feedback: Feedback;
}

const FeedbackItem: React.FC<FeedbackItemProps> = React.memo(({ feedback }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card mb-4 transition-all duration-300 ease-in-out">
      <div 
        className="px-4 py-5 sm:px-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg leading-6 font-medium text-primary">{feedback.department}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {new Date(feedback.timestamp).toLocaleString()}
          </p>
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
      </div>
      {isExpanded && (
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0 animate-fade-in">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Що покращити</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{feedback.problem}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Як це зробити</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{feedback.solution}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Теги</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {feedback.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
});

FeedbackItem.displayName = 'FeedbackItem';

export default FeedbackItem;