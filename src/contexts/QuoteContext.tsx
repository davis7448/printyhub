import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, QuotationItem, QuotationCustomization } from '@/types';
import { PersonalizationConfig } from '@/types';

interface QuoteItemDraft {
  product: Product;
  sizeBreakdown: Record<string, number>;
  customizations: QuotationCustomization[];
}

interface QuoteContextType {
  items: QuoteItemDraft[];
  addItem: (product: Product) => void;
  removeItem: (index: number) => void;
  updateSizeBreakdown: (index: number, breakdown: Record<string, number>) => void;
  addCustomization: (index: number, customization: QuotationCustomization) => void;
  removeCustomization: (itemIndex: number, customizationIndex: number) => void;
  clearQuote: () => void;
  getTotalUnits: () => number;
  getTotalPrice: () => number;
  reset: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItemDraft[]>([]);

  const addItem = (product: Product) => {
    setItems([...items, {
      product,
      sizeBreakdown: {},
      customizations: [],
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateSizeBreakdown = (index: number, breakdown: Record<string, number>) => {
    const newItems = [...items];
    newItems[index].sizeBreakdown = breakdown;
    setItems(newItems);
  };

  const addCustomization = (index: number, customization: QuotationCustomization) => {
    const newItems = [...items];
    newItems[index].customizations.push(customization);
    setItems(newItems);
  };

  const removeCustomization = (itemIndex: number, customizationIndex: number) => {
    const newItems = [...items];
    newItems[itemIndex].customizations = newItems[itemIndex].customizations.filter(
      (_, i) => i !== customizationIndex
    );
    setItems(newItems);
  };

  const clearQuote = () => {
    setItems([]);
  };

  const getTotalUnits = () => {
    return items.reduce((total, item) => {
      const sizes = Object.values(item.sizeBreakdown);
      return total + sizes.reduce((sum, qty) => sum + (qty || 0), 0);
    }, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const itemTotal = item.product.basePrice * getItemUnits(item);
      const customizationsTotal = item.customizations.reduce((sum, c) => sum + c.subtotal, 0);
      return total + itemTotal + customizationsTotal;
    }, 0);
  };

  const reset = () => {
    setItems([]);
  };

  return (
    <QuoteContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateSizeBreakdown,
      addCustomization,
      removeCustomization,
      clearQuote,
      getTotalUnits,
      getTotalPrice,
      reset,
    }}>
      {children}
    </QuoteContext.Provider>
  );
}

function getItemUnits(item: QuoteItemDraft): number {
  return Object.values(item.sizeBreakdown).reduce((sum, qty) => sum + (qty || 0), 0);
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
