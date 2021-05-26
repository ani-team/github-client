import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// FIXME: @lowCoupling
import { ToggleTask } from "pages/tasks-list/toggle-task";
import { TaskCard, taskModel } from "entities/task";
import { Layout } from "shared/ui/layout";
import { Error } from "shared/ui/error";

type Props = RouteChildrenProps<{ ... }>;

export const TaskDetailsPage = (props: Props) => {
    // FIXME: @hardcoded
    const taskId = Number(props.match?.params.taskId);
    // FIXME: @hardcoded
    const task = useSelector((store) => store.entities.tasks[taskId]);

    // FIXME: @dry
    if (!task) {
        return <Error type="404" message="Задача не найдена">
    }

    return (
        <Layout>
            <Layout.Toolbar>
                <Link to="/">К списку задач</Link>
            </Layout.Toolbar>
            <Layout.Content>
                <TaskCard data={task} size="large">
                    <ToggleTask taskId={task.id} />
                </TaskCard>
            </Layout.Content>
        </Layout>
    )
}
