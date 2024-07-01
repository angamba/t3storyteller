import React from 'react';
import { useAuth, RedirectToSignIn } from '@clerk/nextjs';

const withAuthGuard = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  return (props: P) => {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
      return <RedirectToSignIn />;
    }

    return <Component {...props} />;
  };
};

export default withAuthGuard;
