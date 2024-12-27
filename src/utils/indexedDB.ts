import { Dexie, Table } from 'dexie';

export interface Task {
    title: string;
    description?: string | null;
    deadline?: string | null;
    status: 'not_started' | 'in_progress' | 'completed';
}

class MyDatabase extends Dexie {
    tasks!: Table<Task>;

    constructor() {
        super('MyTodoDatabase');
        this.version(1).stores({
            tasks: 'title, description, deadline, status'
        });
    }
}

const db = new MyDatabase();

export const useDatabase = () => {
    const addTask = async (task: Task): Promise<{ success: boolean; message: string }> => {
        try {
            // 同じタイトルのタスクが存在するかチェック
            const existingTask = await db.tasks.get(task.title);
            if (existingTask) {
                return { success: false, message: '同じタイトルのタスクが既に存在します。' };
            }

            // 新しいタスクを追加
            await db.tasks.add(task);
            console.log('Task added with title:', task.title);
            return { success: true, message: 'タスクが正常に追加されました。' };
        } catch (error) {
            console.error('Failed to add task:', error);
            return { success: false, message: 'タスクの追加に失敗しました。' };
        }
    };

    const getTask = async (title: string): Promise<Task | null> => {
        try {
            const task = await db.tasks.get(title);
            if (!task) {
                console.warn(`Task with title "${title}" not found.`);
            }
            return task || null;
        } catch (error) {
            console.error(`Failed to retrieve task with title "${title}":`, error);
            return null;
        }
    };

    const getAllTasks = async (): Promise<Task[]> => {
        try {
            return await db.tasks.toArray();
        } catch (error) {
            console.error('Failed to retrieve tasks:', error);
            return [];
        }
    };

    const updateTask = async (title: string, updates: Partial<Task>): Promise<{ success: boolean; message: string }> => {
        try {
            await db.tasks.update(title, updates);
            return { success: true, message: 'タスクが正常に更新されました。' };
        } catch (error) {
            console.error('Failed to update task:', error);
            return { success: false, message: 'タスクの更新に失敗しました。' };
        }
    };

    const deleteTask = async (title: string): Promise<{ success: boolean; message: string }> => {
        try {
            await db.tasks.delete(title);
            return { success: true, message: 'タスクが正常に削除されました。' };
        } catch (error) {
            console.error('Failed to delete task:', error);
            return { success: false, message: 'タスクの削除に失敗しました。' };
        }
    };

    return {
        addTask,
        getTask,
        getAllTasks,
        updateTask,
        deleteTask,
    };
};