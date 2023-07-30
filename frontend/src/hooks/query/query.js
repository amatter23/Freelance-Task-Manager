import { useQuery } from '@tanstack/react-query';

export const useGetTasks = () => {
  useQuery({
    queryKey: ['tasks'],
    queryFn: () =>
      fetch('http://127.0.0.1:8000/Customers/').then(res => res.json()),
  });
};
