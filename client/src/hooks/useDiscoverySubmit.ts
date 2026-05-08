import { useState } from 'react';
import { DiscoveryFormData } from '@/lib/schemas';

interface SubmitState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export function useDiscoverySubmit() {
  const [state, setState] = useState<SubmitState>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const submit = async (data: DiscoveryFormData) => {
    setState({ isLoading: true, isSuccess: false, error: null });

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: 'byklai-discovery',
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }

      setState({ isLoading: false, isSuccess: true, error: null });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setState({ isLoading: false, isSuccess: false, error: errorMessage });
      return false;
    }
  };

  const reset = () => {
    setState({ isLoading: false, isSuccess: false, error: null });
  };

  return { ...state, submit, reset };
}
