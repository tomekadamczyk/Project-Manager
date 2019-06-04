import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Projects from './containers/Projects/Projects';
import Clients from './containers/Clients/Clients';
import Tasks from './containers/Tasks/Tasks';
import Dashboard from './containers/Dashboard/Dashboard';
import AddProject from './components/Projects/AddProject';
import FullProject from './containers/Projects/FullProject';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/projects/add-project" component={AddProject} />
          <Route path="/projects/:id" component={FullProject} />
          <Route path="/projects" component={Projects} />
          <Route path="/clients" component={Clients} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/" exact component={Dashboard} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
