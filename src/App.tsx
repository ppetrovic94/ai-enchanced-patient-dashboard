import { useEffect, useCallback, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Fab,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Alert,
  Snackbar
} from '@mui/material';
import { Add } from '@mui/icons-material';

import { useReportStore } from './store/reportStore';

import { generateDraft, summarizeContent } from './openai/prompts';

import { SearchFilter, ReportList, ReportForm, AIAssistant } from './components';

import styles from './App.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});



function App() {
  const { initializeStore, selectReport } = useReportStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draftContent, setDraftContent] = useState<string>('');
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  useEffect(() => {
    const unsubscribe = useReportStore.subscribe((state, prevState) => {
      if (state.reports.length !== prevState.reports.length) {
        if (state.reports.length > prevState.reports.length) {
          setNotification({
            open: true,
            message: 'Report created successfully!',
            severity: 'success'
          });
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleCreateNew = useCallback(() => {
    selectReport(null);
    setDraftContent('');
    setIsFormOpen(true);
  }, [selectReport]);

  const handleEditReport = useCallback(() => {
    setDraftContent('');
    setIsFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setDraftContent('');
  }, []);

  const handleSaveAsDraft = useCallback((content: string) => {
    selectReport(null);
    setDraftContent(content);
    setIsFormOpen(true);
  }, [selectReport]);

  const handleGenerateDraft = useCallback(async (prompt: string): Promise<string> => {
    return await generateDraft(prompt);
  }, []);

  const handleSummarizeContent = useCallback(async (content: string): Promise<string> => {
    return await summarizeContent(content);
  }, []);

  const handleCloseNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, open: false }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={styles.appContainer}>
        <AppBar position="static" elevation={1} className={styles.appBar}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AI-Enhanced Patient Dashboard
            </Typography>
            <Button
              color="inherit"
              startIcon={<Add />}
              onClick={handleCreateNew}
            >
              New Report
            </Button>
          </Toolbar>
        </AppBar>
        <Box className={styles.mainContent}>
          <AIAssistant
            onGenerateDraft={handleGenerateDraft}
            onSummarizeContent={handleSummarizeContent}
            onSaveAsDraft={handleSaveAsDraft}
          />
          <SearchFilter />
          <Box className={styles.reportListContainer}>
            <ReportList onReportEdit={handleEditReport} />
          </Box>
          <Fab
            color="primary"
            aria-label="add"
            className={styles.fab}
            onClick={handleCreateNew}
          >
            <Add />
          </Fab>
        </Box>
        <ReportForm
          open={isFormOpen}
          onClose={handleFormClose}
          draftContent={draftContent}
        />
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
