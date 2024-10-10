import React, { useState, useCallback } from 'react';
import { Department, departments } from '../types';
import { Send, Tag } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (department: Department, problem: string, solution: string, isAnonymous: boolean, tags: string[]) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = React.memo(({ onSubmit }) => {
  const [department, setDepartment] = useState<Department>(departments[0]);
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (department && problem && solution) {
      onSubmit(department, problem, solution, isAnonymous, tags);
      setProblem('');
      setSolution('');
      setIsAnonymous(false);
      setTags([]);
    }
  }, [department, problem, solution, isAnonymous, tags, onSubmit]);

  const handleAddTag = useCallback(() => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  }, [newTag, tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }, [tags]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Кому
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
        <label htmlFor="problem" className="block text-sm font-medium text-gray-700">
          Що покращити
        </label>
        <textarea
          id="problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="input-field"
          rows={3}
          placeholder="Опишіть, що можна покращити..."
        />
      </div>
      <div>
        <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
          Як це зробити
        </label>
        <textarea
          id="solution"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          className="input-field"
          rows={3}
          placeholder="Запропонуйте ваше рішення..."
        />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Теги
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="input-field flex-grow"
            placeholder="Додайте тег..."
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="btn-secondary"
          >
            <Tag className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded flex items-center">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <input
          id="anonymous"
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900">
          Зробити відгук анонімним
        </label>
      </div>
      <button
        type="submit"
        className="btn-primary w-full"
      >
        <Send className="mr-2 h-5 w-5" />
        Поділитися думкою
      </button>
    </form>
  );
});

FeedbackForm.displayName = 'FeedbackForm';

export default FeedbackForm;