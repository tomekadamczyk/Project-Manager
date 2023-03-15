import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './modules/App/containers/Layout/Layout';
import { GetProjects } from './modules/Projects/containers/GetProjects/GetProjects';
import Clients from './modules/Clients/Clients';
import { GetTasksContainer } from './modules/Tasks/containers/GetTasks/GetTasksContainer';
import { Dashboard } from './modules/App/containers/Dashboard/Dashboard';
import { AddProject } from './modules/Projects/containers/AddProject/AddProject';
import { Project } from './modules/Projects/containers/Project/Project';
import { Task } from './modules/Tasks/containers/Task/Task';
import { AddTask } from './modules/Tasks/containers/AddTask/AddTask';
import { Kanban } from './modules/App/containers/Kanban/Kanban';
import Login from 'modules/App/components/Login/Login';
import { TaskTimeReports } from 'modules/TimeReports/containers/TaskTimeReports';

export function App() {
  const [isAuthenticated, setAuthenticated] = useState(true);

  function onAuthenticate() {
    setAuthenticated(true)
  }
  
  return (
    isAuthenticated ?
    <Layout>
    <Routes>
      <Route path="/kanban" element={<Kanban />} />
      <Route path="/tasks/add-task" element={<AddTask/>} />
      <Route path="/tasks/:id/reports" element={<TaskTimeReports />} />
      <Route path="/tasks/:id" element={<Task />} />
      <Route path="/tasks" element={<GetTasksContainer />} />
      <Route path="/projects/add-project" element={<AddProject/>} />
      <Route path="/projects/:id" element={<Project/>} />
      <Route path="/projects" element={<GetProjects />} />
      <Route path="/clients" element={<Clients/>} />
      <Route path="/" index element={<Dashboard/>} />
    </Routes>
  </Layout>
  :
  <Routes>
    <Route path="/login" element={<Login onAuthenticate={onAuthenticate} authenticated={isAuthenticated}/>} />
  </Routes>
  )
}
