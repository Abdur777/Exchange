import React, { createContext, useContext, useState } from 'react';
import { Ticker } from '@/app/utils/types';

type PriceContextType = {
  ticker: Ticker | null;
  setTicker: (ticker: Ticker | null) => void;
};

export const PriceContext = createContext<PriceContextType | undefined>(undefined);

export function PriceProvider({ children }: { children: React.ReactNode }) {
  const [ticker, setTicker] = useState<Ticker | null>(null);
  
  return (
    <PriceContext.Provider value={{ ticker, setTicker }}>
      {children}
    </PriceContext.Provider>
  );
}

export function usePriceContext() {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error('usePriceContext must be used within a PriceProvider');
  }
  return context;
}