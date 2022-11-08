import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from './containers/Layout/Layout';
import { GetProjects } from './containers/Projects/GetProjects/GetProjects';
import Clients from './containers/Clients/Clients';
import { GetTasks } from './containers/Tasks/GetTasks/GetTasks';
import { Dashboard } from './containers/Dashboard/Dashboard';
import { AddProject } from './components/Projects/AddProject';
import { Project } from './containers/Projects/Project/Project';
import FullTask from './containers/Tasks/FullTask';
import { AddTask } from './components/Tasks/AddTask/AddTask';
import { Kanban } from './containers/Kanban/Kanban';
import Login from './components/Login/Login';

class App extends Component {
  state = {
    authenticated: true
  }

  onAuthenticate = () => {
    this.setState({authenticated: true})
  }

  render() {
    const loggedUser = 
    <Layout>
    <Routes>
      <Route path="/kanban" element={<Kanban />} />
      <Route path="/tasks/add-task" element={<AddTask/>} />
      <Route path="/tasks/:id" element={<FullTask/>} />
      <Route path="/tasks" element={<GetTasks />} />
      <Route path="/projects/add-project" element={<AddProject/>} />
      <Route path="/projects/:id" element={<Project/>} />
      <Route path="/projects" element={<GetProjects />} />
      <Route path="/clients" element={<Clients/>} />
      <Route path="/" index element={<Dashboard/>} />
    </Routes>
  </Layout>;
  const notLoggedIn = <Route path="/login" element={<Routes><Login onAuthenticate={this.onAuthenticate} authenticated={this.state.authenticated}/></Routes>} />;
    return (
      <div>
        {this.state.authenticated ? loggedUser : notLoggedIn}
      </div>
    );
  }
}

export default App;
