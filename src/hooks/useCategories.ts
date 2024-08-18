import { useState, useEffect, useCallback } from 'react';
import { Category } from '../types';
import { addCategory, getCategories } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (name: string) => {
    try {
      const newCategory = await addCategory(name);
      setCategories(prevCategories => [...prevCategories, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { categories, loading, error, refetch: fetchCategories, createCategory };
};