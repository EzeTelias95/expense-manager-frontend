import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense } from '../types';

interface ExpenseChartProps {
  expenses: Expense[];
}

interface ChartData {
  date: string;
  amount: number;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const chartData = useMemo(() => {
    const data: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      data[date] = (data[date] || 0) + Number(expense.amount);
    });
    return Object.entries(data).map(([date, amount]) => ({ date, amount }));
  }, [expenses]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;