import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { MainLayout } from "..//components/MainLayout";


export function PrivateRoute({ component: Component, ...rest }): JSX.Element {
  return (
    <Route {...rest}
      render={props => localStorage.getItem("token") ?
        <MainLayout {...props}>
          <Component {...props} />
        </MainLayout> :
        <Redirect to={"/"} />
      } />
  );
}
