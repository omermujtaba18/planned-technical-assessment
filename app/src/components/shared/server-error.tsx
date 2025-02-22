import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface ServerErrorProps {
  error: string;
  message: string;
}

export const ServerError: React.FC<{ status: ServerErrorProps }> = ({
  status,
}) => {
  if (!status) return null;

  return (
    <Alert variant="destructive">
      <AlertTitle>{status.error}</AlertTitle>
      <AlertDescription>{status.message}</AlertDescription>
    </Alert>
  );
};
