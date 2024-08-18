import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Budget, ExpenseGroup, Category } from '../../types';
import { addBudget, getBudgets } from '../../services/api/budgets';
import { getCategories, getExpenseGroups } from '../../services/api';

const BudgetManagement: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [groups, setGroups] = useState<ExpenseGroup[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newBudget, setNewBudget] = useState<Omit<Budget, 'id'>>({
    amount: 0,
    start_date: '',
    end_date: '',
    group: undefined,
    category: undefined,
  });

  useEffect(() => {
    fetchBudgets();
    fetchGroups();
    fetchCategories();
  }, []);

  const fetchBudgets = async () => {
    const fetchedBudgets = await getBudgets();
    setBudgets(fetchedBudgets);
  };

  const fetchGroups = async () => {
    const fetchedGroups = await getExpenseGroups();
    setGroups(fetchedGroups);
  };

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const handleAddBudget = async () => {
    await addBudget(newBudget);
    setNewBudget({
      amount: 0,
      start_date: '',
      end_date: '',
      group: undefined,
      category: undefined,
    });
    fetchBudgets();
  };

  return (
    <div>
      <h2>Budgets</h2>
      <TextField
        label="Amount"
        type="number"
        value={newBudget.amount}
        onChange={(e) => setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) })}
      />
      <TextField
        label="Start Date"
        type="date"
        value={newBudget.start_date}
        onChange={(e) => setNewBudget({ ...newBudget, start_date: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        value={newBudget.end_date}
        onChange={(e) => setNewBudget({ ...newBudget, end_date: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl>
        <InputLabel>Group</InputLabel>
        <Select
          value={newBudget.group}
          onChange={(e) => setNewBudget({ ...newBudget, group: e.target.value as number | undefined })}
        >
          <MenuItem value={undefined}>Overall</MenuItem>
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value as number | undefined })}
        >
          <MenuItem value={undefined}>All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleAddBudget}>Add Budget</Button>
      {/* Display existing budgets */}
    </div>
  );
};

export default BudgetManagement;