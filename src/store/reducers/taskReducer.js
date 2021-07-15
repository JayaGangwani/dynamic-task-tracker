const initialState = {
    tasks:[],
    completedTasks: []
}

export default function (state=initialState, action) {
    switch (action.type){
    case "ADD_TASK":
        return {...state, tasks:[...state.tasks, action.payload]}
    case "EDIT_TASK":
        return {...state, tasks: action.payload}
    case "MARK_AS_DONE":
        return {...state, tasks:state.tasks.filter(task=>task.jiraId!==action.payload.jiraId), completedTasks:[...state.completedTasks, action.payload]};
    case "REVERT":
        return {...state, tasks:[...state.tasks, action.payload], completedTasks:state.completedTasks.filter(task=>task.jiraId!==action.payload.jiraId)};
    default:
        return state;
    }
}