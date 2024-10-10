export interface Feedback {
  id: string;
  department: string;
  problem: string;
  solution: string;
  timestamp: number;
  isAnonymous: boolean;
  tags: string[];
}

export type Department =
  | 'ШЕФ'
  | 'CEO'
  | 'Маркетологи'
  | 'Військове право'
  | 'Кримінальне право'
  | 'Сімейне право'
  | 'Податкове право'
  | 'Нерухомість та будівництво'
  | 'Господарське та цивільне право'
  | 'Гранти та інвестиції'
  | 'Міграційне право'
  | 'Міжнародне корпоративне право та фінтех'
  | 'Продажі';

export const departments: Department[] = [
  'ШЕФ',
  'CEO',
  'Маркетологи',
  'Військове право',
  'Кримінальне право',
  'Сімейне право',
  'Податкове право',
  'Нерухомість та будівництво',
  'Господарське та цивільне право',
  'Гранти та інвестиції',
  'Міграційне право',
  'Міжнародне корпоративне право та фінтех',
  'Продажі',
];

export type SortOption = 'date-asc' | 'date-desc' | 'department';