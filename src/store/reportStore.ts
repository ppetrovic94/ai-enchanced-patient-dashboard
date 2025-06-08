import { create } from 'zustand';
import { type PatientReport, mockPatientReports } from './mocks/reports';

interface ReportStore {
    // State
    reports: PatientReport[];
    selectedReport: PatientReport | null;
    searchTerm: string;
    filterCategory: string;
    filterStatus: string;
    isLoading: boolean;

    // Actions
    setReports: (reports: PatientReport[]) => void;
    addReport: (report: PatientReport) => void;
    updateReport: (id: string, updatedReport: Partial<PatientReport>) => void;
    selectReport: (report: PatientReport | null) => void;
    setSearchTerm: (term: string) => void;
    setFilterCategory: (category: string) => void;
    setFilterStatus: (status: string) => void;
    setLoading: (loading: boolean) => void;
    reorderReports: (startIndex: number, endIndex: number) => void;

    // Computed/Filtered data
    getFilteredReports: () => PatientReport[];
    initializeStore: () => void;
}

export const useReportStore = create<ReportStore>((set, get) => ({
    // Initial state
    reports: [],
    selectedReport: null,
    searchTerm: '',
    filterCategory: 'all',
    filterStatus: 'all',
    isLoading: false,

    // Actions
    setReports: (reports) => set({ reports }),

    addReport: (report) => set((state) => ({
        reports: [report, ...state.reports]
    })),

    updateReport: (id, updatedReport) => set((state) => ({
        reports: state.reports.map((report) =>
            report.id === id ? { ...report, ...updatedReport, dateModified: new Date().toISOString() } : report
        )
    })),


    selectReport: (report) => set({ selectedReport: report }),

    setSearchTerm: (term) => set({ searchTerm: term }),

    setFilterCategory: (category) => set({ filterCategory: category }),

    setFilterStatus: (status) => set({ filterStatus: status }),

    setLoading: (loading) => set({ isLoading: loading }),

    reorderReports: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.reports);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { reports: result };
    }),

    getFilteredReports: () => {
        const { reports, searchTerm, filterCategory, filterStatus } = get();

        return reports.filter((report) => {
            const matchesSearch = !searchTerm ||
                report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.patientName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
            const matchesStatus = filterStatus === 'all' || report.status === filterStatus;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    },

    initializeStore: () => {
        // Load mock dataa
        set({ reports: mockPatientReports });
    }
})); 