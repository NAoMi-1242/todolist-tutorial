'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Task, useDatabase } from '@/utils/indexedDB';

interface TaskDetailProps {
    title: string;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ title }) => {
    const [task, setTask] = useState<Task | null>(null);
    const [editedTask, setEditedTask] = useState<Task | null>(null);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { getTask, updateTask, deleteTask } = useDatabase();

    useEffect(() => {
        loadTask();
    }, [title]);

    const loadTask = async () => {
        const loadedTask = await getTask(title);
        setTask(loadedTask);
        setEditedTask(loadedTask);
    };

    if (!task || !editedTask) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedTask.title.trim()) {
            setError('タイトルは必須です');
            return;
        }

        const result = await updateTask(title, editedTask);
        if (result.success) {
            router.push('/');
        } else {
            setError(result.message);
        }
    };

    const handleDelete = async () => {
        const result = await deleteTask(title);
        if (result.success) {
            router.push('/');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        タイトル
                    </label>
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) =>
                            setEditedTask({ ...editedTask, title: e.target.value })
                        }
                        className="w-full p-2 border rounded mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        説明
                    </label>
                    <textarea
                        value={editedTask.description || ''}
                        onChange={(e) =>
                            setEditedTask({ ...editedTask, description: e.target.value })
                        }
                        className="w-full p-2 border rounded mt-1"
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        期限
                    </label>
                    <input
                        type="date"
                        value={editedTask.deadline || ''}
                        onChange={(e) =>
                            setEditedTask({ ...editedTask, deadline: e.target.value })
                        }
                        className="w-full p-2 border rounded mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        ステータス
                    </label>
                    <select
                        value={editedTask.status}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                status: e.target.value as Task['status']
                            })
                        }
                        className="w-full p-2 border rounded mt-1"
                    >
                        <option value="not_started">未着手</option>
                        <option value="in_progress">進行中</option>
                        <option value="completed">完了</option>
                    </select>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        更新
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        削除
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        戻る
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskDetail;