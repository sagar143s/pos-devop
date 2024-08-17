"use client";
// src/app/products-list/page.jsx

import React, { useState } from 'react';
import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Avatar, InputAdornment, useMediaQuery, Grid, Card, CardContent
} from '@mui/material';
import { Edit, Delete, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import Productimg from '../../../public/images/pro.png';

// Sample data for products
const initialProducts = [
  { id: '001', name: 'Product A', category: 'Category 1', price: '$20.00', stock: 100, barcode: '123456789', itemNumber: 'A001', image: Productimg, quantity: 50, seller: 'Seller A' },
  { id: '002', name: 'Product B', category: 'Category 2', price: '$15.00', stock: 50, barcode: '234567890', itemNumber: 'B002', image: Productimg, quantity: 20, seller: 'Seller B' },
  { id: '003', name: 'Product C', category: 'Category 1', price: '$30.00', stock: 200, barcode: '345678901', itemNumber: 'C003', image: Productimg, quantity: 75, seller: 'Seller C' },
  { id: '004', name: 'Product D', category: 'Category 3', price: '$25.00', stock: 75, barcode: '456789012', itemNumber: 'D004', image: Productimg, quantity: 35, seller: 'Seller D' },
  { id: '005', name: 'Product E', category: 'Category 2', price: '$18.00', stock: 30, barcode: '567890123', itemNumber: 'E005', image: Productimg, quantity: 15, seller: 'Seller E' },
];

// Sample data for categories
const categories = [
  { name: 'Category 1', image: '/images/pro.png' },
  { name: 'Category 2', image: '/images/pro.png' },
  { name: 'Category 3', image: '/images/pro.png' },
];

const ProductsList = () => {
  const [productsList, setProductsList] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    barcode: '',
    itemNumber: '',
    image: '',
    quantity: '',
    seller: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Handle edit functionality
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setOpenDialog(true);
  };

  // Handle delete functionality
  const handleDelete = (product) => {
    setCurrentProduct(product);
    setIsDelete(true);
  };

  const confirmDelete = () => {
    setProductsList(productsList.filter(product => product.id !== currentProduct.id));
    setIsDelete(false);
    setCurrentProduct(null);
  };

  const cancelDelete = () => {
    setIsDelete(false);
    setCurrentProduct(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct(null);
    setImageFile(null);
    setImageURL('');
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      barcode: '',
      itemNumber: '',
      image: '',
      quantity: '',
      seller: '',
    });
  };

  const handleSave = () => {
    handleCloseDialog();
  };

  const handleAddProduct = () => {
    const image = imageFile ? URL.createObjectURL(imageFile) : imageURL;
    setProductsList([...productsList, { ...newProduct, id: String(productsList.length + 1), image }]);
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

  const handleCategoryClick = (category) => {
    const filtered = productsList.filter(product => product.category === category.name);
    setFilteredProducts(filtered);
    setShowAllProducts(false);
  };

  const handleAddProductClick = () => {
    setOpenDialog(true);
    setFilteredProducts(productsList); // Display all products when adding a new product
  };

  const handleShowAllProducts = () => {
    setFilteredProducts(productsList);
    setShowAllProducts(true);
  };

  return (
    <Box padding={1} style={{ backgroundColor: '#fff', boxShadow: 'none' }}>
      <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom sx={{  color: "#000" }}>
          Products List
        </Typography>
           
              <Box  display="flex" gap={2} justifyContent="space-between">
                  <Button variant="outlined" onClick={handleShowAllProducts}  sx={{
            background: "#530966",
            color:"#fff",
            marginBottom: "5px",
            borderRadius: "25px",
            borderWidth:"0",
            '&:hover': {
              backgroundColor: '#b104de',
              borderWidth:"0",
            },
          }}>
                     Show All Products
                  </Button>
             


            <Button
          variant="contained"
          color="primary"
          onClick={handleAddProductClick}
          startIcon={isSmallScreen ? <AddIcon /> : null}
          sx={{
            background: "#530966",
            marginBottom: "5px",
            borderRadius: "25px",
            '&:hover': {
              backgroundColor: '#b104de',
            },
          }}
        >
          {!isSmallScreen && 'Add New Product'}
             </Button>
             </Box>
       
       
      </Box>

      {/* Categories Grid */}
      <Box marginY={2}>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={12} sm={4} md={3} key={category.name}>
              <Card onClick={() => handleCategoryClick(category)}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">{category.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    
      

      {/* Products Table */}
      {filteredProducts.length > 0 && (
        <Paper elevation={6} style={{ padding: '0px', backgroundColor: '#ffffff', boxShadow: "none" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl. No.</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Barcode</TableCell>
                  <TableCell>Item Number</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Seller</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.barcode}</TableCell>
                    <TableCell>{product.itemNumber}</TableCell>
                    <TableCell>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.seller}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(product)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product)} color="secondary">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Stock"
            fullWidth
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Barcode"
            fullWidth
            value={newProduct.barcode}
            onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Item Number"
            fullWidth
            value={newProduct.itemNumber}
            onChange={(e) => setNewProduct({ ...newProduct, itemNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Quantity"
            fullWidth
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Seller"
            fullWidth
            value={newProduct.seller}
            onChange={(e) => setNewProduct({ ...newProduct, seller: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={imageURL}
            onChange={handleImageURLChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CloudUploadIcon />
                </InputAdornment>
              ),
            }}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-photo"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-photo">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={currentProduct ? handleSave : handleAddProduct} color="primary">
            {currentProduct ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDelete} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
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
    </Box>
  );
};

export default ProductsList;
