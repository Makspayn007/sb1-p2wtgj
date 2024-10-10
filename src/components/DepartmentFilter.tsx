import React from 'react';
import { Department, departments } from '../types';
import { Filter } from 'lucide-react';

interface DepartmentFilterProps {
  selectedDepartment: Department | 'all';
  onDepartmentChange: (department: Department | 'all') => void;
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = React.memo(({
  selectedDepartment,
  onDepartmentChange,
}) => {
  return (
    <div className="flex items-center">
      <Filter className="mr-2 h-5 w-5 text-primary dark:text-blue-400" />
      <select
        id="department-filter"
        value={selectedDepartment}
        onChange={(e) => onDepartmentChange(e.target.value as Department | 'all')}
        className="input-field dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
      >
        <option value="all">Всі відділи</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
});

DepartmentFilter.displayName = 'DepartmentFilter';

export default DepartmentFilter;