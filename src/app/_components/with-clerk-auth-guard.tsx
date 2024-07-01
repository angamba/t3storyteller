import React from 'react';
import { useAuth, RedirectToSignIn } from '@clerk/nextjs';

const withAuthGuard = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props: P) => {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
      return <RedirectToSignIn />;
    }

    return <Component {...props} />;
  };

  // Set displayName on the returned component
  WrappedComponent.displayName = `withAuthGuard(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};

export default withAuthGuard;
