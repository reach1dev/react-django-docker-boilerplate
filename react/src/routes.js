import React from "react";
import { Route, withRouter } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import SearchResults from "./containers/SearchResults";
import EventView from "./containers/EventView";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/search" component={SearchResults} />
    <Route exact path="/event/:id" component={SearchResults} />
  </Hoc>
);

export default BaseRouter;
