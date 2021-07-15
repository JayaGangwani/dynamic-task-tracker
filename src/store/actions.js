export const addTask = (content) => ({
    type:"ADD_TASK",
    payload: content
})

/**
 * @param content the new task array
 */
export const editTask = (content) => ({
    type:"EDIT_TASK",
    payload: content
})

export const markAsDone = (content)=> {
    console.log(content);
    return ({
    type: "MARK_AS_DONE",
    payload: content
})}

export const revertTask = (content)=> ({
    type: "REVERT",
    payload: content
})