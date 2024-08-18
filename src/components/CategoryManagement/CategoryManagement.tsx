import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useCategories } from '../../hooks/useCategories';

const CategoryManagement: React.FC = () => {
  const { categories, loading, error, createCategory } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        await createCategory(newCategoryName);
        setNewCategoryName('');
      } catch (err) {
        console.error('Failed to add category:', err);
      }
    }
  };

  if (loading) return <Typography>Loading categories...</Typography>;
  if (error) return <Typography color="error">Error loading categories: {error.message}</Typography>;

  return (
    <div>
      <TextField
        label="New Category Name"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddCategory} variant="contained" color="primary">
        Add Category
      </Button>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryManagement;