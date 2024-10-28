interface ErrorMessageProps {
    message: string;
  }
  
  export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{message}</span>
      </div>
    );
  }