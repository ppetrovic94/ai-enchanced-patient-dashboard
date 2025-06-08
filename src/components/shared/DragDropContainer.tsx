import React from 'react';
import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface DragDropContainerProps {
    children: React.ReactNode;
    items: string[];
    onDragEnd: (event: DragEndEvent) => void;
    className?: string;
}

export const DragDropContainer: React.FC<DragDropContainerProps> = ({
    children,
    items,
    onDragEnd,
    className
}) => {
    return (
        <div className={className}>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {children}
                </SortableContext>
            </DndContext>
        </div>
    );
}; 