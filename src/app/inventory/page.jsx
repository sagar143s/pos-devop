"use client";
import React, { useState } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Avatar, Grid, useMediaQuery } from '@mui/material';
import { Edit, Delete, CloudUpload as CloudUploadIcon} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

// Sample data for inventory
const initialInventory = [
  { id: '001', name: 'Item A', category: 'Category 1', price: '$20.00', quantity: 100, barcode: '123456789', itemNumber: 'A001', image: '/path/to/imageA.jpg', supplier: 'Supplier A' },
  { id: '002', name: 'Item B', category: 'Category 2', price: '$15.00', quantity: 15, barcode: '234567890', itemNumber: 'B002', image: '/path/to/imageB.jpg', supplier: 'Supplier B' },
  // Add more items as needed
];

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState(initialInventory);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    barcode: '',
    itemNumber: '',
    image: '',
    supplier: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');

  // Media query to check if screen width is below 600px
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Handle edit functionality
  const handleEdit = (item) => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  // Handle delete functionality
  const handleDelete = (item) => {
    setCurrentItem(item);
    setIsDelete(true);
  };

  const confirmDelete = () => {
    setInventoryList(inventoryList.filter(item => item.id !== currentItem.id));
    setIsDelete(false);
    setCurrentItem(null);
  };

  const cancelDelete = () => {
    setIsDelete(false);
    setCurrentItem(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
    setImageFile(null);
    setImageURL('');
    setNewItem({
      name: '',
      category: '',
      price: '',
      quantity: '',
      barcode: '',
      itemNumber: '',
      image: '',
      supplier: '',
    });
  };

  const handleSave = () => {
    // Save logic for edited item
    handleCloseDialog();
  };

  const handleAddItem = () => {
    const image = imageFile ? URL.createObjectURL(imageFile) : imageURL;
    setInventoryList([...inventoryList, { ...newItem, id: String(inventoryList.length + 1), image }]);
    handleCloseDialog();
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
    setImageURL('');
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
    setImageFile(null);
  };

  return (
    <Box padding={1} style={{ backgroundColor: '#fff' }}>
      <Box sx={{display:'flex',justifyContent:"space-between"}}>
        <Typography variant="h4" gutterBottom>
          Inventory
        </Typography>
        <Box marginTop={2}>
        <Button 
  variant="contained"  
  onClick={() => setOpenDialog(true)}
  startIcon={isSmallScreen ? <AddIcon /> : null}
  sx={{
    background: "#530966",
    '&:hover': {
      backgroundColor: '#b104de',  // Red color on hover
    },
  }}
>
  {!isSmallScreen && 'Add New Item'}
</Button>

        </Box>
      </Box>
      <Paper elevation={6} style={{ padding: '0px', backgroundColor: '#ffffff',boxShadow:'none' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl. No.</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Barcode</TableCell>
                <TableCell>Item Number</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryList.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    backgroundColor: item.quantity < 20 ? '#ffebee' : 'inherit', // Light red background for low stock
                    color: item.quantity < 20 ? '#d32f2f' : 'inherit', // Red color for text in low stock case
                    fontWeight: item.quantity < 20 ? 'bold' : 'normal' // Bold text for low stock case
                  }}
                >
                  <TableCell>{index + 1}</TableCell> {/* Serial Number */}
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.barcode}</TableCell>
                  <TableCell>{item.itemNumber}</TableCell>
                  <TableCell>
                    <Avatar src={item.image} alt={item.name} style={{ width: 60, height: 60 }} />
                  </TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item)} color="secondary">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Confirmation dialog for delete */}
      <Dialog open={isDelete} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the item "{currentItem?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button> 
        </DialogActions>
      </Dialog>

      {/* Edit/Add item dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={currentItem ? currentItem.name : newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={currentItem ? currentItem.category : newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={currentItem ? currentItem.price : newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            value={currentItem ? currentItem.quantity : newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Barcode"
            value={currentItem ? currentItem.barcode : newItem.barcode}
            onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item Number"
            value={currentItem ? currentItem.itemNumber : newItem.itemNumber}
            onChange={(e) => setNewItem({ ...newItem, itemNumber: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Supplier"
            value={currentItem ? currentItem.supplier : newItem.supplier}
            onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={imageURL}
            onChange={handleImageURLChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    component="label"
                  >
                    <CloudUploadIcon />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={currentItem ? handleSave : handleAddItem} color="primary">
            {currentItem ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory;
