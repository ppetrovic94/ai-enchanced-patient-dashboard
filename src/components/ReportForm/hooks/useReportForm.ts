import { useState, useEffect, useCallback, useMemo } from 'react';
import { type PatientReport } from '../../../store/mocks/reports';
import { type FormData, DEFAULT_FORM_DATA } from '../utils/types';

export const useReportForm = (open: boolean, selectedReport: PatientReport | null, draftContent?: string) => {
    const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);

    useEffect(() => {
        if (!open) return;

        if (selectedReport) {
            setFormData({
                title: selectedReport.title,
                content: selectedReport.content,
                patientName: selectedReport.patientName,
                patientId: selectedReport.patientId,
                category: selectedReport.category,
                priority: selectedReport.priority,
                status: selectedReport.status,
            });
        } else {
            setFormData({
                ...DEFAULT_FORM_DATA,
                content: draftContent || DEFAULT_FORM_DATA.content,
            });
        }
    }, [open, selectedReport, draftContent]);

    const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const isValid = useMemo(() => {
        return !!(formData.title.trim() && formData.patientName.trim() && formData.patientId.trim());
    }, [formData.title, formData.patientName, formData.patientId]);

    return { formData, updateField, isValid };
}; 