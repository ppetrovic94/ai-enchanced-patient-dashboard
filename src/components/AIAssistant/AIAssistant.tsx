import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import { AutoAwesome, Summarize, Save } from '@mui/icons-material';
import { TinyMCEEditor } from '../shared/TinyMCEEditor';
import styles from './AIAssistant.module.scss';

interface AIAssistantProps {
    onGenerateDraft?: (prompt: string) => Promise<string>;
    onSummarizeContent?: (content: string) => Promise<string>;
    onSaveAsDraft?: (content: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
    onGenerateDraft,
    onSummarizeContent,
    onSaveAsDraft
}) => {
    const [prompt, setPrompt] = useState('');
    const [aiResult, setAiResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateDraft = async () => {
        if (!prompt.trim() || !onGenerateDraft) return;

        setIsLoading(true);
        setError('');
        setAiResult('');

        try {
            const result = await onGenerateDraft(prompt);
            setAiResult(result);
        } catch (err) {
            setError('Failed to generate draft. Please try again.');
            console.error('AI Draft Generation Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSummarizeDraft = async () => {
        if (!aiResult.trim() || !onSummarizeContent) return;

        setIsLoading(true);
        setError('');

        try {
            const summary = await onSummarizeContent(aiResult);
            setAiResult(summary);
        } catch (err) {
            setError('Failed to summarize draft. Please try again.');
            console.error('AI Summarization Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditorChange = (newValue: string) => {
        setAiResult(newValue);
    };


    const handleSaveAsReport = () => {
        if (!aiResult.trim()) return;

        onSaveAsDraft?.(aiResult);

        setAiResult('');
        setPrompt('');
    };

    return (
        <Paper elevation={1} className={styles.container}>
            <Typography variant="h6" gutterBottom className={styles.header}>
                <AutoAwesome color="primary" />
                AI Assistant
            </Typography>

            <Box className={styles.promptSection}>
                <Typography variant="subtitle2" gutterBottom>
                    Generate Draft Report
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Enter a prompt for AI to generate a draft report (e.g., 'Create a cardiology consultation report for a 45-year-old patient with chest pain')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    variant="outlined"
                    size="small"
                    className={styles.promptInput}
                />
                <Button
                    variant="contained"
                    startIcon={<AutoAwesome />}
                    onClick={handleGenerateDraft}
                    disabled={!prompt.trim() || isLoading || !onGenerateDraft}
                    className={styles.generateDraftButton}
                >
                    Generate Draft
                </Button>
            </Box>

            <Divider className={styles.divider} />

            {isLoading && (
                <Box className={styles.loadingContainer}>
                    <CircularProgress size={20} />
                    <Typography variant="body2">AI is processing your request...</Typography>
                </Box>
            )}

            {error && (
                <Alert severity="error" className={styles.errorAlert}>
                    {error}
                </Alert>
            )}

            {aiResult && (
                <Box className={styles.resultContainer}>
                    <Box className={styles.resultHeader}>
                        <Typography variant="subtitle2" className={styles.resultTitle}>
                            AI Result:
                        </Typography>
                        <Box className={styles.buttonContainer}>
                            <Button
                                variant="outlined"
                                startIcon={<Summarize />}
                                onClick={handleSummarizeDraft}
                                disabled={isLoading || !onSummarizeContent}
                                size="small"
                                className={styles.responsiveButton}
                            >
                                Summarize This Draft
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                onClick={handleSaveAsReport}
                                size="small"
                                color="secondary"
                                className={styles.responsiveButton}
                            >
                                Save as New Report
                            </Button>
                        </Box>
                    </Box>
                    <Box className={styles.editorContainer}>
                        <TinyMCEEditor
                            value={aiResult}
                            onChange={handleEditorChange}
                            height={window.innerWidth < 768 ? 200 : 250}
                            placeholder="AI-generated content will appear here..."
                            simplified={true}
                        />
                    </Box>
                </Box>
            )}
        </Paper>
    );
}; 