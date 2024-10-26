import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isError(error) ? error.message : 'Unknown Error'}</i>
      </p>
    </div>
  );
};

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
