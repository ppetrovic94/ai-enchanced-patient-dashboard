import React from 'react';
import { Card, CardContent, Typography, Chip, Box, TableRow, TableCell, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type PatientReport } from '../../store/mocks/reports';
import styles from './ReportCard.module.scss';

interface ReportCardProps {
    report: PatientReport;
    onClick?: (report: PatientReport) => void;
    isDragging?: boolean;
    isTableView?: boolean;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onClick, isTableView = false }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: report.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleClick = () => {
        if (!isDragging) {
            onClick?.(report);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'success';
            case 'reviewed': return 'info';
            case 'draft': return 'warning';
            default: return 'default';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    if (isTableView && !isMobile) {
        return (
            <TableRow
                ref={setNodeRef}
                style={style}
                {...attributes}
                hover
                className={styles.tableRow}
                onClick={handleClick}
            >
                <TableCell>
                    <Box className={styles.dragHandle}>
                        <IconButton
                            size="small"
                            {...listeners}
                            sx={{ cursor: 'grab' }}
                        >
                            <DragIndicator fontSize="small" />
                        </IconButton>
                        <Box>
                            <Typography variant="subtitle2" className={styles.reportTitle}>
                                {report.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Patient: {report.patientName} (ID: {report.patientId})
                            </Typography>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell>
                    <Chip
                        label={report.status}
                        color={getStatusColor(report.status) as any}
                        size="small"
                    />
                </TableCell>
                <TableCell>
                    <Chip
                        label={report.priority}
                        color={getPriorityColor(report.priority) as any}
                        size="small"
                    />
                </TableCell>
                <TableCell>
                    <Chip
                        label={report.category}
                        variant="outlined"
                        size="small"
                    />
                </TableCell>
                <TableCell>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(report.dateCreated).toLocaleDateString()}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2" color="text.secondary">
                        {report.dateModified !== report.dateCreated
                            ? new Date(report.dateModified).toLocaleDateString()
                            : '-'
                        }
                    </Typography>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={styles.card}
            onClick={handleClick}
        >
            <CardContent>
                <Box className={styles.cardHeader}>
                    <IconButton
                        size="small"
                        {...listeners}
                        sx={{ cursor: 'grab', mt: -0.5 }}
                    >
                        <DragIndicator fontSize="small" />
                    </IconButton>
                    <Box className={styles.cardContent}>
                        <Typography variant="h6" component="h3" gutterBottom>
                            {report.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Patient: {report.patientName} (ID: {report.patientId})
                        </Typography>

                        <Box className={styles.chipContainer}>
                            <Chip
                                label={report.status}
                                color={getStatusColor(report.status) as any}
                                size="small"
                            />
                            <Chip
                                label={report.priority}
                                color={getPriorityColor(report.priority) as any}
                                size="small"
                            />
                            <Chip
                                label={report.category}
                                variant="outlined"
                                size="small"
                            />
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                            Created: {new Date(report.dateCreated).toLocaleDateString()}
                        </Typography>

                        {report.dateModified !== report.dateCreated && (
                            <Typography variant="body2" color="text.secondary">
                                Modified: {new Date(report.dateModified).toLocaleDateString()}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}; 