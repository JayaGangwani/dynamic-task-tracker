import { useState, useEffect } from "react"
import { isValid } from "../utils"
import {connect} from 'react-redux';
import {addTask, editTask} from '../store/actions';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "./TaskForm.css"
import "react-datepicker/dist/react-datepicker.css";


function TaskForm({addTask, isEdit=false, tasks, editTask})
{
 const history = useHistory();
 const params = useParams();
 const selectOptions = ["Select Category", "Select Assignee", "Select Status"]
 const categories = (["NAP Bug Task", "NAP Dev", "New Project", "HP Update"])
 const assignees = ["Bibhu", "Tanzil", "Jaya"]
 const statusOptions = ["In QC", "In Deployment", "On Hold", "Completed"]
 const [startDate, setStartDate] = useState(new Date());
 const [endDate, setEndDate] = useState(new Date());
 const [taskName, setTaskName] = useState("");
 const [category, setCategory] = useState("");
 const [jiraId, setJiraId] = useState("");
 const [assignee, setAssignee] = useState("");
 const [status, setStatus] = useState("");
 const [mockup, setMockup] = useState("");
 const [comments, setComments] = useState("");

 const [isValidName, setIsValidName] = useState(true);
 const [isValidJiraId, setIsValidJiraId] = useState(true);
 const isValidFormInput = isValidName && isValidJiraId;

 useEffect(() => {
     if(isEdit) {
        const taskToEdit = tasks[params.id];
        setTaskName(taskToEdit.taskName);
        setCategory(taskToEdit.category);
        setComments(taskToEdit.comments);
        setAssignee(taskToEdit.assignee);
        setStartDate(taskToEdit.startDate);
        setEndDate(taskToEdit.endDate);
        setComments(taskToEdit.comments);
        setJiraId(taskToEdit.jiraId);
        setMockup(taskToEdit.mockup);
     }
 }, [])
 const handleValidation = (type, value)=>{
    switch(type) {    
    case "name":
            setIsValidName(isValid(value));
            break;
    case "jiraId":
            setIsValidJiraId(isValid(value));
            break;
    default:
            setIsValidName(isValid(value));
            break;
    }
 }

 const handleSubmit = (e)=>{
    e.preventDefault();
    if(!isValidFormInput)
    {
        return;
    }
    else {
        const task = {
            taskName,
            jiraId,
            mockup,
            comments,
            category,
            assignee,
            status,
            startDate,
            endDate
        }
        if(isEdit){
            const newTasks = [...tasks];
            newTasks[params.id] = task;
            editTask(newTasks); 
        }
        else addTask(task);
        console.log(task);
        history.push("/tasks");  
    }
 }
    return(
        <>
        <h1>{!isEdit? "Add":"Edit"} a Task</h1>
        <form onSubmit= {(e) => {handleSubmit(e)}}>
        
          <div>
          <input required class ={`input-md ${isValidName?"":"invalid-input"}`} type="text" value = {taskName} 
          onChange={(e)=>{setTaskName(e.target.value); handleValidation("name", e.target.value)}}  required placeholder= "Task Name" />
          <select required value={isEdit?tasks[params.id].category:null} class = "input-md" onChange ={(e)=>{setCategory(e.target.value)}}>
          {!isEdit && <option selected disabled hidden value ="">{selectOptions[0]}</option>}
              {categories.map((option) =>
                  <option value = {option}>{option}</option>
              )}
          </select>
          <input required class ="input-xs" type="text" value = {jiraId} onChange = {(e)=> {setJiraId(e.target.value); handleValidation("jiraId", e.target.value)}}required placeholder= "Jira ID" />

        </div>

        <div>
            <select required value={isEdit?tasks[params.id].assignee:null} class = "input-sm" onChange = {(e)=> {setAssignee(e.target.value)}}>
            {!isEdit && <option selected disabled hidden value ="">{selectOptions[1]}</option>}
                {assignees.map((assignee) =>
             <option value = {assignee}>{assignee}</option>
                )}

            </select>

            <select class = "input-sm" value={isEdit?tasks[params.id].status:null} onChange = {(e) => {setStatus(e.target.value)}}>
            {!isEdit && <option selected disabled hidden value ="">{selectOptions[2]}</option>}
                {statusOptions.map((status) =>
             <option value = {status}>{status}</option>
                )}
            </select>
            <div className="display-inline customDatePickerWidth">
            <DatePicker class ="input-sm" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="display-inline customDatePickerWidth">
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
            
        </div>
        <div>
        <input required class ="input-lg" type="text" value = {mockup} onChange={(e) => {setMockup(e.target.value)}} placeholder= "Mock UP" /> 
        </div>
        <div>
        <input required class ="input-lg" type="text-area" value = {comments} onChange={(e) => {setComments(e.target.value)}} placeholder= "Other Comments" /> 
        </div>
        <div>
            {!isValidFormInput && <div class="text-warning">*Invalid form inputs</div>}
            <input class ="task-button" value="Submit" type = "submit"/> 
        </div>
       
      </form>
        </>
    )
}
const mapStateToProps = (state)=>({tasks:state.taskReducer.tasks});
const mapDispatchToProps = {
    addTask,
    editTask
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);