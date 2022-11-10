import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './modules/App/containers/Layout/Layout';
import { GetProjects } from './modules/Projects/containers/GetProjects/GetProjects';
import Clients from './modules/Clients/Clients';
import { GetTasks } from './modules/Tasks/containers/GetTasks/GetTasks';
import { Dashboard } from './modules/App/containers/Dashboard/Dashboard';
import { AddProject } from './modules/Projects/containers/AddProject/AddProject';
import { Project } from './modules/Projects/containers/Project/Project';
import { Task } from './modules/Tasks/containers/Task/Task';
import { AddTask } from './modules/Tasks/containers/AddTask/AddTask';
import { Kanban } from './modules/App/containers/Kanban/Kanban';
import Login from 'modules/App/components/Login/Login';

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
      <Route path="/tasks/:id" element={<Task />} />
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
