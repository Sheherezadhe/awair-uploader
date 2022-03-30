import * as React from 'react';
import type { RouteProps } from 'react-router-dom';

import { authorization } from '../../utils/authorization';

interface AuthenticatedRouteParams extends RouteProps {
  roles?: string[];
  forRealm?: boolean
}

export function AuthenticatedRoute(props: AuthenticatedRouteParams) {
  if (authorization?.isAuthenticated() === false) {
    authorization?.login();
    return <><div>Redirecting to Login</div></>;
  }

  return <>{props.children}</>;
}

export default AuthenticatedRoute;