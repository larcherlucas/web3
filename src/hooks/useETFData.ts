import { useState, useEffect, useCallback } from 'react';
import { ETFData } from '../types/etf';
import { getETFData } from '../services/coingecko';

export function useETFData() {
  const [etfData, setETFData] = useState<ETFData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const data = await getETFData();
      setETFData(data);
      setError(null);
      setRetryCount(0);
    } catch (err) {
      console.error('Error fetching ETF data:', err);
      setError('Failed to fetch ETF data. Retrying...');
      
      // Implement exponential backoff for retries
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, Math.pow(2, retryCount) * 1000);
      } else {
        setError('Failed to fetch ETF data. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [fetchData]);

  return { etfData, isLoading, error, refetch: fetchData };
}