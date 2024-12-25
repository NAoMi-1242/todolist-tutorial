import { Task, TaskStatus } from '@/utils/indexedDB';
import Link from 'next/link';

interface TaskListProps {
    tasks: Task[];
    onUpdateStatus: (title: string, newStatus: TaskStatus) => Promise<void>;
    onDeleteTask: (title: string) => Promise<void>;
}

export default function TaskList({ tasks, onUpdateStatus, onDeleteTask }: TaskListProps) {
    return (
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
                                onUpdateStatus(
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
                            onClick={() => onDeleteTask(task.title)}
                            className="text-red-500 hover:text-red-600"
                        >
                            削除
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}