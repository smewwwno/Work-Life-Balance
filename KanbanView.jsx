import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useApp } from '../../context/AppContext';
import { COLUMNS } from '../../data/seedData';
import { Plus } from 'lucide-react';
import TaskModal from '../../components/Common/TaskModal';

export default function KanbanView() {
  const { filteredTasks, moveTask, addTask, mode } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const colName = COLUMNS[result.destination.droppableIndex] ?? result.destination.droppableId;
    moveTask(result.draggableId, colName);
  };

  return (
    <>
      <div className="view-header">
        <h2 className="view-title">Kanban Board</h2>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {COLUMNS.map(col => {
            const cards = filteredTasks.filter(t => t.column === col);
            return (
              <div className="kanban-column" key={col}>
                <div className="kanban-column-header">
                  <span className="kanban-column-title">{col}</span>
                  <span className="kanban-column-count">{cards.length}</span>
                </div>
                <Droppable droppableId={col}>
                  {(provided, snapshot) => (
                    <div
                      className={`kanban-cards ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {cards.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className={`kanban-card ${snapshot.isDragging ? 'dragging' : ''}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="kanban-card-title">{task.title}</div>
                              <div className="kanban-card-meta">
                                <span className={`badge badge-${task.priority}`}>{task.priority}</span>
                                <span className={`badge badge-${task.domain}`}>{task.domain}</span>
                                {task.due && <span className="kanban-card-due">{task.due}</span>}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {modalOpen && (
        <TaskModal
          mode={mode}
          onSave={(task) => { addTask(task); setModalOpen(false); }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
