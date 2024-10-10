import React from 'react';
import { CommunicationRating } from '../types';
import { Star } from 'lucide-react';

interface CommunicationRatingListProps {
  ratings: CommunicationRating[];
}

const CommunicationRatingList: React.FC<CommunicationRatingListProps> = ({ ratings }) => {
  const sortedRatings = [...ratings].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Останні оцінки комунікації</h3>
      {sortedRatings.length > 0 ? (
        <ul className="space-y-4">
          {sortedRatings.map((rating) => (
            <li key={rating.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h4 className="text-lg leading-6 font-medium text-gray-900">{rating.department}</h4>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {new Date(rating.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Оцінка</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Star
                            key={value}
                            className={`h-5 w-5 ${
                              value <= rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Коментар</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{rating.comment}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Поки що немає оцінок комунікації.</p>
      )}
    </div>
  );
};

export default CommunicationRatingList;