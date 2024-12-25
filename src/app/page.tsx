'use client';

import React, { useEffect, useState } from 'react';
import { useDatabase, Task, TaskStatus } from '@/utils/indexedDB';
import TaskList from '@/components/TaskList';
import Link from 'next/link';

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
            {/* <TaskList
                tasks={tasks}
                onUpdateStatus={handleUpdateStatus}
                onDeleteTask={handleDeleteTask}
            /> */}
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.title}
                        className="border rounded p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                        <Link href={`/tasks/${encodeURIComponent(task.title)}`} className="flex-1">
                            <div className="space-y-2">
                                <h3 className="font-semibold">{task.title}</h3>
                                {task.description && (
                                    <p className="text-gray-600">
                                        {task.description}
                                    </p>
                                )}
                                {task.deadline && (
                                    <p className="text-sm text-gray-500">
                                        期限: {task.deadline}
                                    </p>
                                )}
                            </div>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <select
                                value={task.status}
                                onChange={(e) =>
                                    handleUpdateStatus(
                                        task.title,
                                        e.target.value as TaskStatus
                                    )
                                }
                                className="p-2 border rounded"
                            >
                                <option value="not_started">未着手</option>
                                <option value="in_progress">進行中</option>
                                <option value="completed">完了</option>
                            </select>
                            <button
                                onClick={() => handleDeleteTask(task.title)}
                                className="text-red-500 hover:text-red-600"
                            >
                                削除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}