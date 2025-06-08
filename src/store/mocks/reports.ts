export const ReportStatus = {
    DRAFT: 'draft',
    COMPLETED: 'completed',
    REVIEWED: 'reviewed'
} as const;

export const ReportCategory = {
    GENERAL: 'general',
    CARDIOLOGY: 'cardiology',
    NEUROLOGY: 'neurology',
    ORTHOPEDICS: 'orthopedics',
    DERMATOLOGY: 'dermatology'
} as const;

export const ReportPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
} as const;

export type ReportStatusType = typeof ReportStatus[keyof typeof ReportStatus];
export type ReportCategoryType = typeof ReportCategory[keyof typeof ReportCategory];
export type ReportPriorityType = typeof ReportPriority[keyof typeof ReportPriority];

export interface PatientReport {
    id: string;
    title: string;
    content: string;
    patientId: string;
    patientName: string;
    dateCreated: string;
    dateModified: string;
    status: ReportStatusType;
    category: ReportCategoryType;
    priority: ReportPriorityType;
}

export const mockPatientReports: PatientReport[] = [
    {
        id: '1',
        title: 'Annual Physical Examination - John Doe',
        content: `Patient presented for routine annual physical examination. 
    
Vital Signs:
- Blood Pressure: 120/80 mmHg
- Heart Rate: 72 bpm
- Temperature: 98.6°F
- Weight: 175 lbs
- Height: 5'10"

Assessment:
Patient appears to be in good general health. All vital signs within normal limits. No acute concerns noted during examination.

Plan:
- Continue current medications
- Follow up in 12 months for next annual exam
- Recommended routine lab work including CBC and metabolic panel`,
        patientId: 'P001',
        patientName: 'John Doe',
        dateCreated: '2024-01-15T10:30:00.000Z',
        dateModified: '2024-01-15T10:30:00.000Z',
        status: ReportStatus.COMPLETED,
        category: ReportCategory.GENERAL,
        priority: ReportPriority.LOW
    },
    {
        id: '2',
        title: 'Cardiac Consultation - Sarah Johnson',
        content: `Patient referred for cardiac evaluation due to chest pain episodes.

Chief Complaint:
Intermittent chest pain for past 2 weeks, especially during physical activity.

History:
45-year-old female with history of hypertension. Pain described as pressure-like, rated 6/10, lasting 5-10 minutes.

Examination:
- Heart sounds: Regular rate and rhythm, no murmurs
- Lungs: Clear bilaterally
- EKG: Normal sinus rhythm

Assessment:
Possible stable angina, requires further cardiac workup.

Plan:
- Stress test scheduled
- Echocardiogram ordered
- Continue current antihypertensive medication
- Follow up in 1 week`,
        patientId: 'P002',
        patientName: 'Sarah Johnson',
        dateCreated: '2024-01-20T14:15:00.000Z',
        dateModified: '2024-01-22T09:45:00.000Z',
        status: ReportStatus.REVIEWED,
        category: ReportCategory.CARDIOLOGY,
        priority: ReportPriority.HIGH
    },
    {
        id: '3',
        title: 'Neurological Assessment - Michael Chen',
        content: `Patient presents with headaches and dizziness.

Symptoms:
- Persistent headaches for 1 month
- Occasional dizziness
- No vision changes
- No nausea or vomiting

Neurological Exam:
- Cranial nerves intact
- Motor strength 5/5 all extremities
- Reflexes normal and symmetric
- Coordination tests normal

Assessment:
Tension-type headaches likely. No neurological deficits noted.

Plan:
- Trial of tension headache management
- Stress reduction techniques
- Follow up in 2 weeks if symptoms persist`,
        patientId: 'P003',
        patientName: 'Michael Chen',
        dateCreated: '2024-01-18T11:00:00.000Z',
        dateModified: '2024-01-18T11:00:00.000Z',
        status: ReportStatus.DRAFT,
        category: ReportCategory.NEUROLOGY,
        priority: ReportPriority.MEDIUM
    },
    {
        id: '4',
        title: 'Orthopedic Evaluation - Emma Wilson',
        content: `Patient referred for knee pain evaluation.

History:
28-year-old active female with right knee pain following hiking injury 3 days ago.

Physical Examination:
- Right knee: Mild swelling, tender to palpation
- Range of motion: Limited due to pain
- Stability tests: Negative for ligament injury
- X-ray: No fracture seen

Assessment:
Acute knee strain, likely soft tissue injury.

Treatment Plan:
- Rest, ice, compression, elevation (RICE protocol)
- NSAIDs for pain management
- Physical therapy referral
- Follow up in 1 week`,
        patientId: 'P004',
        patientName: 'Emma Wilson',
        dateCreated: '2024-01-25T16:30:00.000Z',
        dateModified: '2024-01-25T16:30:00.000Z',
        status: ReportStatus.COMPLETED,
        category: ReportCategory.ORTHOPEDICS,
        priority: ReportPriority.MEDIUM
    },
    {
        id: '5',
        title: 'Dermatological Consultation - Robert Martinez',
        content: `Patient presents for skin lesion evaluation.

Chief Complaint:
New mole on back, noticed by spouse 2 weeks ago.

Examination:
- Lesion: 0.5cm diameter, irregular borders
- Color: Variegated brown and black
- Location: Upper back, right side
- No other concerning lesions noted

Assessment:
Atypical nevus requiring biopsy for definitive diagnosis.

Plan:
- Punch biopsy scheduled for next week
- Dermoscopy photos taken for comparison
- Patient education on sun protection
- Follow up for biopsy results`,
        patientId: 'P005',
        patientName: 'Robert Martinez',
        dateCreated: '2024-01-28T13:20:00.000Z',
        dateModified: '2024-01-28T13:20:00.000Z',
        status: ReportStatus.DRAFT,
        category: ReportCategory.DERMATOLOGY,
        priority: ReportPriority.HIGH
    }
]; 