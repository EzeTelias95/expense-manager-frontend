import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { ExpenseGroup } from '../../types';
import { addExpenseGroup, getExpenseGroups } from '../../services/api';

const ExpenseGroupManagement: React.FC = () => {
  const [groups, setGroups] = useState<ExpenseGroup[]>([]);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const fetchedGroups = await getExpenseGroups();
    setGroups(fetchedGroups);
  };

  const handleAddGroup = async () => {
    if (newGroupName.trim()) {
      await addExpenseGroup(newGroupName);
      setNewGroupName('');
      fetchGroups();
    }
  };

  return (
    <div>
      <h2>Expense Groups</h2>
      <TextField
        label="New Group Name"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
      />
      <Button onClick={handleAddGroup}>Add Group</Button>
      <List>
        {groups.map((group) => (
          <ListItem key={group.id}>
            <ListItemText primary={group.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ExpenseGroupManagement;