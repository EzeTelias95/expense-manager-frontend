import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { Category, ExpenseGroup } from '../types';
import { addExpense, getExpenseGroups } from '../services/api';

interface AddExpenseProps {
  onExpenseAdded: () => void;
  categories: Category[];
}

const AddExpense: React.FC<AddExpenseProps> = ({ onExpenseAdded, categories }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<number | ''>('');
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [groups, setGroups] = useState<ExpenseGroup[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const fetchedGroups = await getExpenseGroups();
      setGroups(fetchedGroups);
    } catch (error) {
      console.error('Failed to fetch expense groups:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addExpense({
        amount: parseFloat(amount),
        description,
        date,
        category: category || undefined,
        group_ids: selectedGroups,
      });
      setAmount('');
      setDescription('');
      setDate('');
      setCategory('');
      setSelectedGroups([]);
      onExpenseAdded();
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Add New Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as number | '')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Groups</InputLabel>
          <Select
            multiple
            value={selectedGroups}
            onChange={(e) => setSelectedGroups(e.target.value as number[])}
            renderValue={(selected) => groups.filter(g => selected.includes(g.id)).map(g => g.name).join(', ')}
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                <Checkbox checked={selectedGroups.indexOf(group.id) > -1} />
                <ListItemText primary={group.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Expense
        </Button>
      </form>
    </Container>
  );
};

export default AddExpense;