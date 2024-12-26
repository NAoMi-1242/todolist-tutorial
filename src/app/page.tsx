'use client';

import { useEffect, useState } from 'react';
import { useDatabase, Task, TaskStatus } from '@/utils/indexedDB';
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
        <div className="w-full flex" style={{ height: 'calc(100vh - 13rem)' }}>
            {/* 左側: タスク追加フォーム */}
            <div className="w-1/3 max-w-[300px] p-4 border-r">
                <h2 className="text-xl font-semibold mb-4">タスクを追加</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        タスクを追加
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
            

            {/* 右側: タスクリスト */}
            <div className="p-4  w-full flex flex-col overflow-auto scrollbar-hide gap-4">
                {['not_started', 'in_progress', 'completed'].map((status) => (
                    <div key={status} className="flex-1   h-1/3 border rounded-2xl p-3 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4  bg-white">
                            {status === 'not_started' ? '未着手' : status === 'in_progress' ? '進行中' : '完了'}
                        </h2>
                        <hr className="mb-4" />
                        <div className="overflow-x-auto flex gap-4 scrollbar-hide">
                            {tasks.filter(task => task.status === status).map((task) => (
                                <div
                                    key={task.title}
                                    className={`border rounded-xl p-2 hover:bg-gray-50 w-60 flex-shrink-0 border-l-4 flex flex-col  ${
                                        status === 'not_started'
                                            ? 'border-l-gray-300'
                                            : status === 'in_progress'
                                            ? 'border-l-blue-300'
                                            : 'border-l-red-200'
                                    }`}
                                >
                                    <Link href={`/tasks/${encodeURIComponent(task.title)}`} className="flex-grow pb-1">
                                        <div className="space-y-1">
                                            <h3 className="font-semibold">{task.title}</h3>
                                            {task.description && (
                                                <p className="text-gray-600 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">{task.description}</p>
                                            )}
                                            {task.deadline && (
                                                <p className="text-sm text-gray-500">期限: {task.deadline}</p>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="mt-auto pt-2 flex space-x-4 border-t">
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleUpdateStatus(task.title, e.target.value as TaskStatus)}
                                            className="p-1.5 border rounded"
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
                ))}
            </div>
        </div>
    );
}