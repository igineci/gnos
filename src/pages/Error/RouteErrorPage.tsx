import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

const RouteErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const isNotFound = error.status === 404;

    return (
      <ErrorPage
        status={String(error.status)}
        title={isNotFound ? 'Signal Not Found' : 'Transmission Failed'}
        description={
          isNotFound
            ? 'The route you tried to reach does not exist in this sector. The requested page may have been moved, removed, or never broadcast at all.'
            : error.statusText || 'An unexpected routing error interrupted the experience.'
        }
      />
    );
  }

  return (
    <ErrorPage
      status="ERROR"
      title="Transmission Failed"
      description={error instanceof Error ? error.message : 'An unexpected routing error interrupted the experience.'}
    />
  );
};

export default RouteErrorPage;
