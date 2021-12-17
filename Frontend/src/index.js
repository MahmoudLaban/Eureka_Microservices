import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import indexRoutes from './routes/index';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
  
    <Switch>
      {indexRoutes.map((prop, key) => {
       
          return <Route exact path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  
  </BrowserRouter>,
  document.getElementById('root')
);

