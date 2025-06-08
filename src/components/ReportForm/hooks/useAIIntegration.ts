import { useCallback, useEffect, useRef } from 'react';

interface AIIntegrationOptions {
    isOpen: boolean;
    onContentUpdate: (content: string) => void;
    enableGlobalAccess?: boolean;
}

export const useAIIntegration = ({
    isOpen,
    onContentUpdate,
    enableGlobalAccess = true
}: AIIntegrationOptions) => {
    const handlerRef = useRef(onContentUpdate);

    useEffect(() => {
        handlerRef.current = onContentUpdate;
    }, [onContentUpdate]);

    useEffect(() => {
        if (!isOpen || !enableGlobalAccess) return;

        const globalHandler = (content: string) => {
            handlerRef.current(content);
        };

        (window as any).populateReportForm = globalHandler;

        return () => {
            delete (window as any).populateReportForm;
        };
    }, [isOpen, enableGlobalAccess]);

    const populateContent = useCallback((content: string) => {
        if (isOpen) {
            handlerRef.current(content);
        }
    }, [isOpen]);

    return {
        populateContent,
        isActive: isOpen
    };
}; 