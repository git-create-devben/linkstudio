import { useState, useEffect } from 'react';

interface GeolocationData {
  country: string | null;
  currency: string;
  isLoading: boolean;
  error: string | null;
}

export const useGeolocation = (): GeolocationData => {
  const [country, setCountry] = useState<string | null>(null);
  const [currency, setCurrency] = useState('USD');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Country to currency mapping for Paystack-supported countries
  const getCurrencyForCountry = (countryCode: string) => {
    const currencyMap = {
      'NG': { code: 'NGN', symbol: '₦' }, // Nigeria
      'GH': { code: 'GHS', symbol: 'GH₵' }, // Ghana
      'ZA': { code: 'ZAR', symbol: 'R' }, // South Africa
      'KE': { code: 'KES', symbol: 'KSh' }, // Kenya
      'EG': { code: 'EGP', symbol: 'E£' }, // Egypt
      'UG': { code: 'UGX', symbol: 'USh' }, // Uganda
      'TZ': { code: 'TZS', symbol: 'TSh' }, // Tanzania
      'RW': { code: 'RWF', symbol: 'RWF' }, // Rwanda
      'CI': { code: 'XOF', symbol: 'CFA' }, // Ivory Coast
      'DEFAULT': { code: 'USD', symbol: '$' }
    };
    
    return currencyMap[countryCode as keyof typeof currencyMap] || currencyMap['DEFAULT'];
  };

  const detectUserCountry = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Method 1: Using ipapi.co
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.country_code) {
        setCountry(data.country_code);
        const currencyData = getCurrencyForCountry(data.country_code);
        setCurrency(currencyData.code);
        return;
      }
    } catch (error) {
      console.error('Error detecting country:', error);
      
      // Fallback: try alternative method
      try {
        const fallbackResponse = await fetch('https://api.country.is/');
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.country) {
          setCountry(fallbackData.country);
          const currencyData = getCurrencyForCountry(fallbackData.country);
          setCurrency(currencyData.code);
          return;
        }
      } catch (fallbackError) {
        console.error('Fallback country detection failed:', fallbackError);
        setError('Failed to detect location');
      }
    } finally {
      // Default to USD if all methods fail
      if (!country) {
        setCountry('US');
        setCurrency('USD');
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    detectUserCountry();
  }, []);

  return { country, currency, isLoading, error };
};