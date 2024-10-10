import React, { useState, useCallback } from 'react';
import { Department, departments } from '../types';
import { Star } from 'lucide-react';

interface CommunicationRatingFormProps {
  onSubmit: (department: Department, rating: number, comment: string) => void;
}

const CommunicationRatingForm: React.FC<CommunicationRatingFormProps> = React.memo(({ onSubmit }) => {
  const [department, setDepartment] = useState<Department>(departments[0]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (department && rating > 0) {
      onSubmit(department, rating, comment);
      setRating(0);
      setComment('');
    }
  }, [department, rating, comment, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Відділ
        </label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value as Department)}
          className="input-field"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Оцінка комунікації
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`h-8 w-8 cursor-pointer ${
                value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              onClick={() => setRating(value)}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Коментар
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="input-field"
          rows={3}
          placeholder="Додайте коментар щодо комунікації з відділом..."
        />
      </div>
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={rating === 0}
      >
        <Star className="mr-2 h-5 w-5" />
        Надіслати оцінку
      </button>
    </form>
  );
});

CommunicationRatingForm.displayName = 'CommunicationRatingForm';

export default CommunicationRatingForm;