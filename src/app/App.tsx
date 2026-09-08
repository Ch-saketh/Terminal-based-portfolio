import React from 'react';
import { AppShell } from './AppShell';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppShell />
    </ErrorBoundary>
  );
};

export default App;
