import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Category } from '../types';

interface ExpenseFiltersProps {
  filterText: string;
  setFilterText: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  categories: Category[];
  selectedCategory: number | '';
  setSelectedCategory: (value: number | '') => void;
  sortField: 'date' | 'amount' | 'description';
  setSortField: (value: 'date' | 'amount' | 'description') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  filterText,
  setFilterText,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  categories,
  selectedCategory,
  setSelectedCategory,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Filter by description"
          value={filterText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e: SelectChangeEvent<number | ''>) => setSelectedCategory(e.target.value as number | '')}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortField}
            onChange={(e: SelectChangeEvent<'date' | 'amount' | 'description'>) => setSortField(e.target.value as 'date' | 'amount' | 'description')}
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="description">Description</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e: SelectChangeEvent<'asc' | 'desc'>) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ExpenseFilters;