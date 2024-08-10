import './App.css';
import {TasksList} from "./components/tasks/TasksList.tsx";
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/home/Home.tsx";
import {TaskForm} from "./components/tasks/TaskForm.tsx";
import React from "react";

function App() {

    return (
        <div className='bg-zinc-900 h-screen text-white'>
            <div className="flex items-center justify-center h-full ">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create-task" element={<TaskForm/>}/>
                    <Route path="/edit-task/:id" element={<TaskForm/>}/>
                </Routes>


            </div>
        </div>
  );
}

export default App;
