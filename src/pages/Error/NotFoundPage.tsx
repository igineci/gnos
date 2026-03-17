import { ErrorPage } from './ErrorPage';

const NotFoundPage = () => (
  <ErrorPage
    status="404"
    title="Signal Not Found"
    description="The route you tried to reach does not exist in this sector. The requested page may have been moved, removed, or never broadcast at all."
  />
);

export default NotFoundPage;
