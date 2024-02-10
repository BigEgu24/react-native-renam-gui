import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function Router(props) {
  const myRoutes = props.routes;

  return (
    <BrowserRouter>
      <Switch>
        {Array.isArray(myRoutes) &&
          myRoutes.map((route, index) => (
            <Route
              path={route.path}
              exact
              render={() => route.render}
              key={index}
            />
          ))}
      </Switch>
    </BrowserRouter>
  );
}
