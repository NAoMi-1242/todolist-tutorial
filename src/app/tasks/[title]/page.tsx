import TaskDetail from "./Task";

export default async function ChannelPageWrapper({ params }: { params: { title: string } }) {
    const { title } = await params;
    const decodeTitle = decodeURIComponent(title);
    return <TaskDetail title={decodeTitle} />;
}