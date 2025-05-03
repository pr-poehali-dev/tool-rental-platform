
import { useState, useCallback } from 'react';
import { useApiError } from './useApiError';
import { useToast } from '@/components/ui/use-toast';

export function useApi<T, P = any>(
  apiFunction: (params?: P) => Promise<T>,
  options?: {
    loadOnMount?: boolean;
    initialParams?: P;
    successMessage?: string;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const { isLoading, setIsLoading, error, handleError, clearError } = useApiError();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const execute = useCallback(
    async (params?: P): Promise<T | null> => {
      clearError();
      setIsLoading(true);
      setIsSuccess(false);

      try {
        const result = await apiFunction(params);
        setData(result);
        setIsSuccess(true);
        
        if (options?.successMessage) {
          toast({
            title: 'Успешно',
            description: options.successMessage
          });
        }
        
        return result;
      } catch (err) {
        handleError(err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, handleError, clearError, setIsLoading, toast, options?.successMessage]
  );

  // Загрузка данных при монтировании компонента, если требуется
  useState(() => {
    if (options?.loadOnMount) {
      execute(options?.initialParams);
    }
  });

  return {
    data,
    isLoading,
    error,
    execute,
    setData,
    isSuccess
  };
}
