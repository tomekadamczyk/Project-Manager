import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Projects from './containers/Projects/Projects';
import Clients from './containers/Clients/Clients';
import Tasks from './containers/Tasks/Tasks';
import Dashboard from './containers/Dashboard/Dashboard';
import AddProject from './components/Projects/AddProject';
import FullProject from './containers/Projects/FullProject';
import FullTask from './containers/Tasks/FullTask';
import AddTask from './components/Tasks/AddTask';
import Kanban from './containers/Kanban/Kanban';
import Login from './components/Login/Login';

class App extends Component {


  render =() => {
    const loggedUser = 
    <Layout>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/kanban" component={Kanban} />
      <Route path="/tasks/add-task" component={AddTask} />
      <Route path="/tasks/:id" component={FullTask} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/projects/add-project" component={AddProject} />
      <Route path="/projects/:id" component={FullProject} />
      <Route path="/projects" component={Projects} />
      <Route path="/clients" component={Clients} />
      <Route path="/" exact component={Dashboard} />
    </Switch>
  </Layout>;
    return (
      <div>
        {loggedUser}
      </div>
    );
  }
}

export default App;
