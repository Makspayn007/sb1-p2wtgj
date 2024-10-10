import React from 'react';
import { SortOption } from '../types';
import { ArrowUpDown } from 'lucide-react';

interface SortSelectorProps {
  onSortChange: (option: SortOption) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ onSortChange }) => {
  return (
    <div className="flex items-center">
      <ArrowUpDown className="mr-2 h-5 w-5 text-primary" />
      <select
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="input-field"
      >
        <option value="date-desc">Дата (найновіші)</option>
        <option value="date-asc">Дата (найстаріші)</option>
        <option value="department">Відділ</option>
      </select>
    </div>
  );
};

export default SortSelector;