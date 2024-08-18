// src/components/Dashboard.tsx
import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useCategories } from '../../hooks/useCategories';
import AddExpense from '../AddExpense';
import BudgetManagement from '../BudgetManagement/BudgetManagement';
import ExpenseGroupManagement from '../BudgetManagement/ExpenseGroupManagement';
import CategoryManagement from '../CategoryManagement/CategoryManagement';
import ExpenseList from '../ExpenseList';

const Dashboard: React.FC = () => {
  const { categories, loading, error } = useCategories();
  const [refreshExpenses, setRefreshExpenses] = useState(0);

  const handleExpenseAdded = () => {
    setRefreshExpenses(prev => prev + 1);
  };

  if (loading) return <Typography>Loading dashboard...</Typography>;
  if (error) return <Typography color="error">Error loading dashboard: {error.message}</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '1rem' }}>
          <Typography variant="h5" gutterBottom>Add Expense</Typography>
          <AddExpense 
            onExpenseAdded={handleExpenseAdded} 
            categories={categories} 
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '1rem' }}>
          <Typography variant="h5" gutterBottom>Expense Groups</Typography>
          <ExpenseGroupManagement />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '1rem' }}>
          <Typography variant="h5" gutterBottom>Budget Management</Typography>
          <BudgetManagement />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '1rem' }}>
          <Typography variant="h5" gutterBottom>Category Management</Typography>
          <CategoryManagement />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '1rem' }}>
          <Typography variant="h5" gutterBottom>Expenses</Typography>
          <ExpenseList key={refreshExpenses} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;