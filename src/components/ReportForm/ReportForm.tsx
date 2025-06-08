import React, { useCallback } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
} from '@mui/material';
import { TinyMCEEditor } from '../shared';
import { useReportStore } from '../../store/reportStore';
import { type PatientReport } from '../../store/mocks/reports';
import { useReportForm, useAIIntegration } from './hooks';
import { DROPDOWN_OPTIONS } from './utils';
import styles from './ReportForm.module.scss';
import { SelectField } from './components';

interface ReportFormProps {
    open: boolean;
    onClose: () => void;
    draftContent?: string;
}



export const ReportForm: React.FC<ReportFormProps> = ({
    open,
    onClose,
    draftContent
}) => {
    const { selectedReport, addReport, updateReport } = useReportStore();
    const { formData, updateField, isValid } = useReportForm(open, selectedReport, draftContent);

    useAIIntegration({
        isOpen: open,
        onContentUpdate: (content: string) => updateField('content', content)
    });

    const handleSave = useCallback(() => {
        if (!isValid) return;

        const reportData: Partial<PatientReport> = formData;

        if (selectedReport) {
            updateReport(selectedReport.id, reportData);
        } else {
            const newReport: PatientReport = {
                ...reportData as PatientReport,
                id: Date.now().toString(),
                dateCreated: new Date().toISOString(),
                dateModified: new Date().toISOString()
            };
            addReport(newReport);
        }

        onClose();
    }, [formData, isValid, selectedReport, updateReport, addReport, onClose]);

    const isEditing = !!selectedReport;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            className={styles.dialog}
        >
            <DialogTitle>
                {isEditing ? 'Edit Report' : 'Create New Report'}
            </DialogTitle>

            <DialogContent>
                <Box className={styles.content}>
                    <TextField
                        label="Report Title"
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        fullWidth
                        required
                    />

                    <Box className={styles.patientRow}>
                        <TextField
                            label="Patient Name"
                            value={formData.patientName}
                            onChange={(e) => updateField('patientName', e.target.value)}
                            required
                            className={styles.patientField}
                        />
                        <TextField
                            label="Patient ID"
                            value={formData.patientId}
                            onChange={(e) => updateField('patientId', e.target.value)}
                            required
                            className={styles.patientField}
                        />
                    </Box>

                    <Box className={styles.selectRow}>
                        <SelectField
                            label="Category"
                            value={formData.category}
                            onChange={(value) => updateField('category', value)}
                            options={DROPDOWN_OPTIONS.category}
                            className={styles.selectField}
                        />

                        <SelectField
                            label="Priority"
                            value={formData.priority}
                            onChange={(value) => updateField('priority', value)}
                            options={DROPDOWN_OPTIONS.priority}
                            className={styles.selectField}
                        />

                        <SelectField
                            label="Status"
                            value={formData.status}
                            onChange={(value) => updateField('status', value)}
                            options={DROPDOWN_OPTIONS.status}
                            className={styles.selectField}
                        />
                    </Box>

                    <Typography variant="subtitle2" className={styles.contentLabel}>
                        Report Content (Rich Text)
                    </Typography>
                    <Box className={styles.editorContainer}>
                        <TinyMCEEditor
                            value={formData.content}
                            onChange={(value) => updateField('content', value)}
                            height={window.innerWidth < 768 ? 300 : 350}
                            placeholder="Enter your medical report here..."
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!isValid}
                >
                    {isEditing ? 'Update' : 'Create'} Report
                </Button>
            </DialogActions>
        </Dialog>
    );
}; 