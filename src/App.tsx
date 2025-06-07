import { useState } from 'react';
import { Container, Button, Box } from '@mui/material';
import Editor from '@monaco-editor/react';
import { create } from 'zustand';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import OpenAI from 'openai';

const useStore = create<{ count: number; increment: () => void }>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true
});

function App() {
  const [editorContent, setEditorContent] = useState('console.log("Hello Monaco!");');
  const [aiResult, setAiResult] = useState<string>('Not tested');
  const { count, increment } = useStore();

  const testOpenAI = async () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      setAiResult(`Error: No API key`);
      return;
    }

    try {
      setAiResult('Testing...');

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Say hello" }],
        max_tokens: 10,
      });
      setAiResult(response.choices[0]?.message?.content || 'No response');
    } catch (error) {
      setAiResult('Error: ' + (error as Error).message);
    }
  };

  const DraggableItem = () => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: 'draggable',
    });

    return (
      <button ref={setNodeRef} {...listeners} {...attributes}>
        Drag me
      </button>
    );
  };

  const DroppableArea = ({ children }: { children: React.ReactNode }) => {
    const { setNodeRef } = useDroppable({
      id: 'droppable',
    });

    return (
      <div ref={setNodeRef}>
        {children}
      </div>
    );
  };

  return (
    <Container>
      <Box>
        <Button onClick={increment}>Count: {count}</Button>
      </Box>

      <Box>
        <Editor
          height="200px"
          value={editorContent}
          onChange={(value) => setEditorContent(value || '')}
        />
      </Box>

      <Box>
        <DndContext>
          <DroppableArea>
            <div>
              <DraggableItem />
            </div>
          </DroppableArea>
        </DndContext>
      </Box>

      <Box>
        <Button onClick={testOpenAI}>Test OpenAI</Button>
        <div>Result: {aiResult}</div>
      </Box>
    </Container>
  );
}

export default App;
