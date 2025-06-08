import {
    ReportStatus,
    ReportCategory,
    ReportPriority,
    type ReportStatusType,
    type ReportCategoryType,
    type ReportPriorityType
} from '../../../store/mocks/reports';

export interface FormData {
    title: string;
    content: string;
    patientName: string;
    patientId: string;
    category: ReportCategoryType;
    priority: ReportPriorityType;
    status: ReportStatusType;
}



export const DEFAULT_FORM_DATA: FormData = {
    title: '',
    content: '<p>Enter your medical report here...</p>',
    patientName: '',
    patientId: '',
    category: ReportCategory.GENERAL,
    priority: ReportPriority.MEDIUM,
    status: ReportStatus.DRAFT,
};

export const DROPDOWN_OPTIONS = {
    category: [
        { value: ReportCategory.GENERAL, label: 'General' },
        { value: ReportCategory.CARDIOLOGY, label: 'Cardiology' },
        { value: ReportCategory.NEUROLOGY, label: 'Neurology' },
        { value: ReportCategory.ORTHOPEDICS, label: 'Orthopedics' },
        { value: ReportCategory.DERMATOLOGY, label: 'Dermatology' },
    ],
    priority: [
        { value: ReportPriority.LOW, label: 'Low' },
        { value: ReportPriority.MEDIUM, label: 'Medium' },
        { value: ReportPriority.HIGH, label: 'High' },
    ],
    status: [
        { value: ReportStatus.DRAFT, label: 'Draft' },
        { value: ReportStatus.COMPLETED, label: 'Completed' },
        { value: ReportStatus.REVIEWED, label: 'Reviewed' },
    ],
} as const; 