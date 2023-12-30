import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-3 pt-52">
      <div role="alert" className="error">
        <h1>Error</h1>
        <h2>{error.toString()}</h2>
        <button onClick={resetErrorBoundary}>Reset Error</button>
      </div>
    </div>
  );
};

export default ErrorFallback;
