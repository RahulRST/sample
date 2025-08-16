import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Chip,
  Toolbar,
  Tooltip,
  Alert,
  Snackbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar
} from '@mui/material';
import {
  GetApp as ExportIcon,
  FilterList as FilterIcon,
  AccountCircle as PersonIcon,
  Schedule as TimeIcon
} from '@mui/icons-material';
import * as XLSX from 'xlsx';

const CustomerDataTable = () => {
  // Sample data with your specified columns including new ones
  const [tableData] = useState([
    {
      sno: 1,
      name: 'John Doe',
      idNumber: 'ID123456789',
      dob: '1985-03-15',
      gender: 'Male',
      product: 'Personal Loan',
      idProof: 'Passport',
      address: '123 Main St, New York, NY 10001',
      income: 75000,
      phoneNumber: '+1-555-0123',
      status: 'completed',
      applicationDate: '2025-08-10T09:30:00Z',
      handledBy: 'Sarah Johnson'
    },
    {
      sno: 2,
      name: 'Jane Smith',
      idNumber: 'ID987654321',
      dob: '1990-07-22',
      gender: 'Female',
      product: 'Home Loan',
      idProof: 'Driver License',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      income: 95000,
      phoneNumber: '+1-555-0456',
      status: 'verified',
      applicationDate: '2025-08-14T14:15:00Z',
      handledBy: 'Michael Chen'
    },
    {
      sno: 3,
      name: 'Mike Johnson',
      idNumber: 'ID456789123',
      dob: '1988-12-08',
      gender: 'Male',
      product: 'Credit Card',
      idProof: 'National ID',
      address: '789 Pine St, Chicago, IL 60601',
      income: 68000,
      phoneNumber: '+1-555-0789',
      status: 'processing',
      applicationDate: '2025-08-15T11:45:00Z',
      handledBy: 'Emily Rodriguez'
    },
    {
      sno: 4,
      name: 'Sarah Wilson',
      idNumber: 'ID321654987',
      dob: '1992-05-10',
      gender: 'Female',
      product: 'Business Loan',
      idProof: 'Passport',
      address: '321 Cedar Rd, Houston, TX 77001',
      income: 85000,
      phoneNumber: '+1-555-0321',
      status: 'created',
      applicationDate: '2025-08-16T08:20:00Z',
      handledBy: 'David Kumar'
    },
    {
      sno: 5,
      name: 'David Brown',
      idNumber: 'ID789123456',
      dob: '1986-11-14',
      gender: 'Male',
      product: 'Auto Loan',
      idProof: 'Driver License',
      address: '654 Birch Ln, Phoenix, AZ 85001',
      income: 72000,
      phoneNumber: '+1-555-0654',
      status: 'verified',
      applicationDate: '2025-08-13T16:30:00Z',
      handledBy: 'Sarah Johnson'
    },
    {
      sno: 6,
      name: 'Emily Davis',
      idNumber: 'ID147258369',
      dob: '1994-02-28',
      gender: 'Female',
      product: 'Personal Loan',
      idProof: 'National ID',
      address: '987 Maple Dr, Miami, FL 33101',
      income: 58000,
      phoneNumber: '+1-555-0987',
      status: 'processing',
      applicationDate: '2025-08-12T13:10:00Z',
      handledBy: 'Michael Chen'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Calculate application age
  const calculateApplicationAge = (applicationDate) => {
    const now = new Date();
    const appDate = new Date(applicationDate);
    const diffInMs = now - appDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
    } else {
      return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''}`;
    }
  };

  // Get application age color based on duration
  const getAgeColor = (applicationDate) => {
    const now = new Date();
    const appDate = new Date(applicationDate);
    const diffInDays = Math.floor((now - appDate) / (1000 * 60 * 60 * 24));

    if (diffInDays >= 7) return 'error.main';
    if (diffInDays >= 3) return 'warning.main';
    return 'success.main';
  };

  // Export to Excel function
  const exportToExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      
      // Transform data for Excel export
      const exportData = getFilteredData().map(item => ({
        'S.No': item.sno,
        'Name': item.name,
        'ID Number': item.idNumber,
        'Date of Birth': formatDate(item.dob),
        'Gender': item.gender,
        'Product': item.product,
        'ID Proof': item.idProof,
        'Address': item.address,
        'Income': `$${item.income.toLocaleString()}`,
        'Phone Number': item.phoneNumber,
        'Application Date': formatDateTime(item.applicationDate),
        'Application Age': calculateApplicationAge(item.applicationDate),
        'Handled By': item.handledBy,
        'Status': item.status.charAt(0).toUpperCase() + item.status.slice(1)
      }));
      
      const ws = XLSX.utils.json_to_sheet(exportData);
      
      // Set column widths
      ws['!cols'] = [
        { wch: 6 },  // S.No
        { wch: 20 }, // Name
        { wch: 15 }, // ID Number
        { wch: 12 }, // DOB
        { wch: 8 },  // Gender
        { wch: 15 }, // Product
        { wch: 15 }, // ID Proof
        { wch: 40 }, // Address
        { wch: 12 }, // Income
        { wch: 15 }, // Phone
        { wch: 18 }, // Application Date
        { wch: 15 }, // Application Age
        { wch: 18 }, // Handled By
        { wch: 12 }  // Status
      ];
      
      XLSX.utils.book_append_sheet(wb, ws, 'Customer_Data');
      
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filterSuffix = statusFilter !== 'all' ? `_${statusFilter}` : '';
      const filename = `customer_data${filterSuffix}_${timestamp}.xlsx`;
      
      XLSX.writeFile(wb, filename);
      
      setSnackbar({
        open: true,
        message: `Excel file exported successfully! (${getFilteredData().length} records)`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      setSnackbar({
        open: true,
        message: 'Error occurred while exporting to Excel',
        severity: 'error'
      });
    }
  };

  // Get filtered data based on status
  const getFilteredData = () => {
    if (statusFilter === 'all') return tableData;
    return tableData.filter(item => item.status === statusFilter);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  // Format date and time for display
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US');
  };

  // Format income for display
  const formatIncome = (income) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(income);
  };

  // Get status chip color and variant
  const getStatusStyle = (status) => {
    const styles = {
      created: { color: 'info', variant: 'outlined' },
      verified: { color: 'success', variant: 'filled' },
      processing: { color: 'warning', variant: 'filled' },
      completed: { color: 'success', variant: 'filled' }
    };
    return styles[status] || { color: 'default', variant: 'outlined' };
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Get status counts
  const getStatusCounts = () => {
    return {
      created: tableData.filter(item => item.status === 'created').length,
      verified: tableData.filter(item => item.status === 'verified').length,
      processing: tableData.filter(item => item.status === 'processing').length,
      completed: tableData.filter(item => item.status === 'completed').length
    };
  };

  const statusCounts = getStatusCounts();
  const filteredData = getFilteredData();

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customer Management System
        </Typography>
        
        {/* Toolbar with Export and Filter */}
        <Toolbar 
          sx={{ 
            pl: { sm: 2 }, 
            pr: { xs: 1, sm: 1 },
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 1,
            mb: 2
          }}
        >
          <PersonIcon sx={{ mr: 2 }} />
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            component="div"
          >
            Customer Records
          </Typography>
          
          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel sx={{ color: 'white' }}>Filter Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ 
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '.MuiSvgIcon-root': { color: 'white' }
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="created">Created</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          
          <Tooltip title={`Export ${filteredData.length} Records`}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ExportIcon />}
              onClick={exportToExcel}
            >
              Export Excel
            </Button>
          </Tooltip>
        </Toolbar>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 2, minWidth: 120 }}>
            <Typography variant="h6" color="primary">
              {tableData.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Records
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, minWidth: 120 }}>
            <Typography variant="h6" color="info.main">
              {statusCounts.created}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, minWidth: 120 }}>
            <Typography variant="h6" color="success.main">
              {statusCounts.verified}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Verified
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, minWidth: 120 }}>
            <Typography variant="h6" color="warning.main">
              {statusCounts.processing}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Processing
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, minWidth: 120 }}>
            <Typography variant="h6" color="success.main">
              {statusCounts.completed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="customer data table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 60 }}>S.No</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 150 }}>Name</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 120 }}>ID Number</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 100 }}>DOB</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 80 }}>Gender</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 120 }}>Product</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 120 }}>ID Proof</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 200 }}>Address</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 100 }} align="right">Income</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 130 }}>Phone</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 120 }} align="center">App Age</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 150 }}>Handled By</TableCell>
              <TableCell sx={{ bgcolor: 'grey.100', fontWeight: 'bold', minWidth: 100 }} align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((customer, index) => {
              const statusStyle = getStatusStyle(customer.status);
              const ageColor = getAgeColor(customer.applicationDate);
              return (
                <TableRow
                  key={customer.sno}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: 'action.hover' },
                    bgcolor: index % 2 === 0 ? 'grey.50' : 'white'
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                    {customer.sno}
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {customer.idNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(customer.dob)}</TableCell>
                  <TableCell>{customer.gender}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {customer.product}
                    </Typography>
                  </TableCell>
                  <TableCell>{customer.idProof}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography variant="body2" noWrap title={customer.address}>
                      {customer.address}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'success.main' }}>
                      {formatIncome(customer.income)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {customer.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: ageColor }} />
                      <Typography variant="body2" sx={{ color: ageColor, fontWeight: 'medium' }}>
                        {calculateApplicationAge(customer.applicationDate)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          mr: 1, 
                          fontSize: '0.75rem',
                          bgcolor: 'primary.main'
                        }}
                      >
                        {getInitials(customer.handledBy)}
                      </Avatar>
                      <Typography variant="body2">
                        {customer.handledBy}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      color={statusStyle.color}
                      variant={statusStyle.variant}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredData.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No records found for the selected filter
          </Typography>
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerDataTable;
