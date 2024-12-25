'use client';

import React, { useEffect, useState } from 'react';
import { useDatabase, Task, TaskStatus } from '@/utils/indexedDB';
import TaskList from '@/components/TaskList';

export default function TodoPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({
        title: '',
        description: '',
        deadline: '',
        status: 'not_started'
    });
    const [error, setError] = useState<string>('');

    const { addTask, getAllTasks, updateTask, deleteTask } = useDatabase();

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const loadedTasks = await getAllTasks();
        setTasks(loadedTasks);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.title.trim()) {
            setError('タイトルは必須です');
            return;
        }

        const result = await addTask(newTask);
        if (result.success) {
            setNewTask({
                title: '',
                description: '',
                deadline: '',
                status: 'not_started'
            });
            setError('');
            loadTasks();
        } else {
            setError(result.message);
        }
    };

    const handleUpdateStatus = async (title: string, newStatus: TaskStatus) => {
        const result = await updateTask(title, { status: newStatus });
        if (result.success) {
            loadTasks();
        }
    };

    const handleDeleteTask = async (title: string) => {
        const result = await deleteTask(title);
        if (result.success) {
            loadTasks();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* タスク追加フォーム */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 border rounded p-4">
                <h2 className="text-xl font-semibold mb-4">タスクを追加</h2>
                <div>
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="タスクのタイトル"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={newTask.description || ''}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="説明（任意）"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        value={newTask.deadline || ''}
                        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    タスクを追加
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>

            {/* タスクリストコンポーネント */}
            <TaskList
                tasks={tasks}
                onUpdateStatus={handleUpdateStatus}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
}