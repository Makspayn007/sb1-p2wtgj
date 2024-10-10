import { Feedback } from '../types';

export const exportToCSV = (data: Feedback[], filename: string) => {
  const headers = ['ID', 'Відділ', 'Проблема', 'Рішення', 'Дата', 'Анонімний', 'Теги'];
  const csvContent = [
    headers.join(','),
    ...data.map(item => [
      item.id,
      item.department,
      `"${item.problem.replace(/"/g, '""')}"`,
      `"${item.solution.replace(/"/g, '""')}"`,
      new Date(item.timestamp).toLocaleString(),
      item.isAnonymous ? 'Так' : 'Ні',
      `"${item.tags.join(', ')}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};