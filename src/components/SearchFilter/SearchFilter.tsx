import React from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import { useReportStore } from '../../store/reportStore';
import styles from './SearchFilter.module.scss';

export const SearchFilter: React.FC = () => {
    const {
        searchTerm,
        filterCategory,
        filterStatus,
        setSearchTerm,
        setFilterCategory,
        setFilterStatus,
        getFilteredReports,
        reports
    } = useReportStore();

    const filteredReports = getFilteredReports();

    return (
        <Box className={styles.container}>
            <Typography variant="h6" gutterBottom>
                Search & Filter Reports
            </Typography>

            <Box className={styles.filterRow}>
                <TextField
                    label="Search reports..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title or patient name"
                    className={styles.searchField}
                />

                <FormControl size="small" className={styles.categorySelect}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={filterCategory}
                        label="Category"
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        <MenuItem value="general">General</MenuItem>
                        <MenuItem value="cardiology">Cardiology</MenuItem>
                        <MenuItem value="neurology">Neurology</MenuItem>
                        <MenuItem value="orthopedics">Orthopedics</MenuItem>
                        <MenuItem value="dermatology">Dermatology</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" className={styles.statusSelect}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={filterStatus}
                        label="Status"
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="reviewed">Reviewed</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Typography variant="body2" color="text.secondary">
                Showing {filteredReports.length} of {reports.length} reports
            </Typography>
        </Box>
    );
}; 