import TaskTable from "./TaskTable";
function Tasks(){
    return <>
    <TaskTable></TaskTable>
    <TaskTable isDoneTable={true}></TaskTable>
    </>
}

export default Tasks;