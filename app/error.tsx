"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";
import { error } from "console";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Oops!" subtitle="Something went wrong." />;
};

export default ErrorState;
