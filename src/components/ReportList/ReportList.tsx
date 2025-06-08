import React from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { type DragEndEvent } from '@dnd-kit/core';
import { DragDropContainer } from '../shared/DragDropContainer';
import { useReportStore } from '../../store/reportStore';
import { ReportCard } from '../ReportCard';

interface ReportListProps {
    onReportEdit?: () => void;
}

export const ReportList: React.FC<ReportListProps> = ({ onReportEdit }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const {
        getFilteredReports,
        reorderReports,
        selectReport,
    } = useReportStore();

    const filteredReports = getFilteredReports();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = filteredReports.findIndex((report) => report.id === active.id);
            const newIndex = filteredReports.findIndex((report) => report.id === over?.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                reorderReports(oldIndex, newIndex);
            }
        }
    };

    const handleReportClick = (report: any) => {
        selectReport(report);
        onReportEdit?.();
    };

    if (filteredReports.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    No reports found. Try adjusting your search or filters.
                </Typography>
            </Box>
        );
    }

    const reportIds = filteredReports.map(r => r.id);

    if (isMobile) {
        return (
            <DragDropContainer items={reportIds} onDragEnd={handleDragEnd}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {filteredReports.map((report) => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            onClick={handleReportClick}
                            isTableView={false}
                        />
                    ))}
                </Box>
            </DragDropContainer>
        );
    }

    return (
        <DragDropContainer items={reportIds} onDragEnd={handleDragEnd}>
            <TableContainer component={Paper} elevation={1}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Report & Patient</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Created</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Modified</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReports.map((report) => (
                            <ReportCard
                                key={report.id}
                                report={report}
                                onClick={handleReportClick}
                                isTableView={true}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DragDropContainer>
    );
}; 