import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from './containers/Layout/Layout';
import Projects from './containers/Projects/Projects';
import Clients from './containers/Clients/Clients';
import Tasks from './containers/Tasks/Tasks';
import { Dashboard } from './containers/Dashboard/Dashboard';
import { AddProject } from './components/Projects/AddProject';
import FullProject from './containers/Projects/FullProject';
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
      <Route path="/tasks" element={<Tasks/>} />
      <Route path="/projects/add-project" element={<AddProject/>} />
      <Route path="/projects/:id" element={<FullProject/>} />
      <Route path="/projects" element={<Projects/>} />
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
