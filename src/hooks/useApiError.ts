
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface ApiError {
  message: string;
  status?: number;
  details?: string;
}

export function useApiError() {
  const { toast } = useToast();
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error: unknown) => {
    setIsLoading(false);
    
    let errorMessage = 'Произошла неизвестная ошибка';
    let errorDetails = '';
    let errorStatus;
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null) {
      const errorObj = error as any;
      errorMessage = errorObj.message || errorMessage;
      errorDetails = errorObj.details || '';
      errorStatus = errorObj.status;
    }
    
    const apiError: ApiError = {
      message: errorMessage,
      details: errorDetails,
      status: errorStatus
    };
    
    setError(apiError);
    
    toast({
      title: 'Ошибка',
      description: errorMessage,
      variant: 'destructive',
    });
    
    return apiError;
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    isLoading,
    setIsLoading,
    handleError,
    clearError
  };
}
