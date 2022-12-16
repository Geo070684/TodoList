import React, {useCallback} from 'react';
import './App.css';
import AddItemForm from './Components/AddItemForm';
import TodoList  from './TodoList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Redusers/tasks-redusers";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC, TaskFilterType, TodolistDomainType,
} from "./Redusers/todolists-redusers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// class components
function App() {

    // BusnessLogic
    // бывает еще интерфейс -терминал 
    // Графический интерфейс у нас в проекте (GUI)
    // GUI-> CRUD(Create, Read, Update, Delete)
    // С + -одна функция
    // r +++
    // U ++!-пропорционально сложности обьекта (сколько свойств столько и функций внесения изменений)
    // D +

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state)=>state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType >((state)=> state.tasks)
    const dispatch = useDispatch()
    const deleteTodoList = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID ))

    }

    const removeTask = useCallback(( todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId,taskId))
    },[dispatch])

    const changeTask = useCallback((todolistID: string, buttonName: TaskFilterType) => {
        dispatch(changeTodolistFilterAC(todolistID,buttonName ))
    },[dispatch])

    // UseState работает асинхронно
    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID,title ))

    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action =addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, status))
    },[dispatch])

    const changeTaskTitle = useCallback((todolistsID: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistsID, taskId, title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID,title ))
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style ={{padding:"20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container>
                    <Grid container spacing={3}>
                        {todolists.map(item => {
                            let taskForFilter = tasks[item.id];
                            return (<Grid item>
                                <Paper style={{padding: "15px"}}>
                                    <TodoList title={item.title}
                                              key={item.id}
                                              task={taskForFilter}
                                              removeTask={removeTask}
                                              changeTask={changeTask}
                                              addTask={addTask}
                                              changeStatus={changeStatus}
                                              filter={item.filter}
                                              todolistID={item.id}
                                              deleteTodolist={deleteTodoList}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>)
                        })}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );

}

export default App;
