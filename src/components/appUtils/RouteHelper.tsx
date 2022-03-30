import React from 'react';
import AuthenticatedRoute from './AuthenticatedRoute';
import ErrorBoundary from './ErrorBoundary';

interface RouteHelperProps {
  errorBoundary?: boolean;
  privateRoute?: boolean;
  children: JSX.Element;
}

const RouteHelper = ({ children, errorBoundary = true, privateRoute = true }: RouteHelperProps) => {
  let element = children;
  if (errorBoundary) {
    element = (
      <ErrorBoundary>
        {element}
      </ErrorBoundary>
    );
  }
  if (privateRoute) {
    element = (
      <AuthenticatedRoute>
        {element}
      </AuthenticatedRoute>
    );
  }
  return element;
};

export default RouteHelper;
