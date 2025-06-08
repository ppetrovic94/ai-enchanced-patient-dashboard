import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
    value: string;
    onChange: (value: string) => void;
    height?: number;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    simplified?: boolean;
}

export const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
    value,
    onChange,
    height,
    placeholder = 'Enter content here...',
    disabled = false,
    className,
    simplified = false
}) => {
    const isMobile = window.innerWidth < 768;
    const editorHeight = height || (isMobile ? 250 : 350);

    const getToolbar = () => {
        if (simplified || isMobile) {
            return 'undo redo | bold italic | bullist numlist | removeformat | table link';
        }
        return 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table link | preview code | help';
    };

    return (
        <div className={className}>
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                value={value}
                onEditorChange={onChange}
                disabled={disabled}
                init={{
                    height: editorHeight,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar: getToolbar(),
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    placeholder,
                    branding: false,
                    resize: false,
                    elementpath: false,
                    statusbar: false
                }}
            />
        </div>
    );
}; 