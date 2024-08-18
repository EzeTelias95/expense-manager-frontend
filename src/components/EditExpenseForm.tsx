import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText
} from '@mui/material';
import { Expense, Category, ExpenseGroup } from '../types';
import { getExpenseGroups, updateExpense } from '../services/api';

interface EditExpenseFormProps {
  expense: Expense;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedExpense: Expense) => void;
  categories: Category[];
}

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({ 
  expense, open, onClose, onUpdate, categories 
}) => {
  const [amount, setAmount] = useState(expense.amount.toString());
  const [description, setDescription] = useState(expense.description);
  const [date, setDate] = useState(expense.date);
  const [category, setCategory] = useState<number | ''>(expense.category || '');
  const [selectedGroups, setSelectedGroups] = useState<number[]>(expense.groups.map(g => g.id));
  const [groups, setGroups] = useState<ExpenseGroup[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    setAmount(expense.amount.toString());
    setDescription(expense.description);
    setDate(expense.date);
    setCategory(expense.category || '');
    setSelectedGroups(expense.groups.map(g => g.id));
  }, [expense]);

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
      const updatedExpense = await updateExpense(expense.id, {
        amount: parseFloat(amount),
        description,
        date,
        category: category || undefined,
        group_ids: selectedGroups,
      });
      onUpdate(updatedExpense);
      onClose();
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseForm;