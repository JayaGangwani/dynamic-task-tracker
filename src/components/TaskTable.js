import {connect} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {editTask, revertTask, markAsDone} from "../store/actions";
import "./TaskTable.css";
function TaskTable ({tasks, completedTasks, isDoneTable=false, editTask, revertTask, markAsDone})
{
    const history = useHistory();
    const tableHeadings = ["Sl.NO", "TaskName", "Created", "Due", "Go Live", "Assignee", "Category", "Status", "JiraId", "Mockup", "Notes", "Actions"];
    const [tasksToShow, setTasksToShow] = useState([]);
    useEffect(() => {
       setTasksToShow(isDoneTable?completedTasks:tasks);
    })
    return <>
    <h3 class="center">Tasks {isDoneTable? "Done": "Pending"}</h3>
    <table>
  <tr>
      {tableHeadings.map(heading=><th>{heading}</th>)}
  </tr>
  {tasksToShow.length===0 && <div><h3 class="center">Sorry, no tasks to show</h3></div>}
  {tasksToShow.map((task, index)=>(
  <tr>
    <td>{index + 1}</td>
    <td>{task.taskName}</td>
    <td>{task.startDate.toLocaleString()}</td>
    <td>{task.endDate.toLocaleString()}</td>
    <td>{task.endDate.toLocaleString()}</td>
    <td>{task.assignee}</td>
    <td>{task.category}</td>
    <td>{task.status}</td>
    <td>{task.jiraId}</td>
    <td>{task.mockup}</td>
    <td>{task.comments}</td>
    
        {!isDoneTable && 
        (<td><button key={`edit${index}`} onClick={()=>{history.push(`/edit/${index}`)}}>Edit</button>
        <button key={`done${index}`} onClick={()=>{markAsDone(task)}}>Done</button></td>)}
        {isDoneTable && <td><button key={`revert${index}`} onClick={()=>{revertTask(task)}}>Revert</button></td>}
  </tr>))}
  
</table>
    </>
}

const mapStateToProps = (state)=>{
    const { tasks, completedTasks } = state.taskReducer;
    return {tasks, completedTasks};
}

const mapDispatchToProps = {
    editTask, revertTask, markAsDone
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);