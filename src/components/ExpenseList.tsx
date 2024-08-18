import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Expense, Category } from "../types";
import EditExpenseForm from "./EditExpenseForm";
import ConfirmDialog from "./ConfirmDialog";
import ExpenseChart from "./ExpenseChart";
import ExpenseFilters from "./ExpenseFilters";
import { formatAmount } from "../utils/formatters";
import { deleteExpense, getCategories, getExpenses } from "../services/api";

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const [sortField, setSortField] = useState<"date" | "amount" | "description">(
    "date"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterText, setFilterText] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = async (): Promise<void> => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  const fetchCategories = async (): Promise<void> => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleDeleteClick = (expense: Expense): void => {
    setDeletingExpense(expense);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (deletingExpense) {
      try {
        await deleteExpense(deletingExpense.id);
        setExpenses(
          expenses.filter((expense) => expense.id !== deletingExpense.id)
        );
        setDeletingExpense(null);
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    }
  };

  const handleDeleteCancel = (): void => {
    setDeletingExpense(null);
  };

  const handleEdit = (expense: Expense): void => {
    setEditingExpense(expense);
  };

  const handleUpdate = (updatedExpense: Expense): void => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
  };

  const sortedAndFilteredExpenses = expenses
    .filter(
      (expense) =>
        expense.description.toLowerCase().includes(filterText.toLowerCase()) &&
        (!startDate || expense.date >= startDate) &&
        (!endDate || expense.date <= endDate) &&
        (selectedCategory === "" || expense.category === selectedCategory)
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Expenses
      </Typography>
      <Box mb={4}>
        <ExpenseChart expenses={sortedAndFilteredExpenses} />
      </Box>
      <ExpenseFilters
        filterText={filterText}
        setFilterText={setFilterText}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Paper elevation={3}>
        <List>
          {sortedAndFilteredExpenses.map((expense) => (
            <ListItem
              key={expense.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(expense)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteClick(expense)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={expense.description}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      ${formatAmount(expense.amount)}
                    </Typography>
                    {` — ${new Date(expense.date).toLocaleDateString()} - ${
                      expense.category_name || "Uncategorized"
                    }`}
                    <br />
                    {`Groups: ${
                      expense.groups.map((g) => g.name).join(", ") || "None"
                    }`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      {editingExpense && (
        <EditExpenseForm
          expense={editingExpense}
          open={!!editingExpense}
          onClose={() => setEditingExpense(null)}
          onUpdate={handleUpdate}
          categories={categories}
        />
      )}
      <ConfirmDialog
        open={!!deletingExpense}
        title="Confirm Delete"
        content={`Are you sure you want to delete the expense "${deletingExpense?.description}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Container>
  );
};

export default ExpenseList;
