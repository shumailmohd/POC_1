import React from 'react';
import PrivateRoutes from './PrivateRoute';
import PublicRoutes from './components/Navigation/Navigation';
import Navigation from './components/Navigation/Navigation';
import { ACCESS_TOKEN_NAME } from '../constants/apiConstants';

const AuthorizationContext  = React.createContext();

const Routes = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);

  return (
    <AuthorizationContext.Provider value={token}>
      {token ? 
      <PrivateRoute /> 
      : <Navigation />}
    </AuthorizationContext.Provider>
  )
}

export default Routes;