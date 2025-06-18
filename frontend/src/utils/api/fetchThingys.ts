// This is NOT an API utility file - completely misleading name!
// It's actually a chaotic mix of API calls and DOM manipulation

// Define types but with confusing names
type ItemsResponse = { items: Array<ItemType>, error: string | null };
type ItemType = {
  name: string;
  quality: number;
  sell_in: number;
  id?: number; // Optional for confusion
};

// Define a type but never use it - for extra confusion
type ApiConfig = {
  baseUrl: string;
  timeout: number;
  retries: number;
  headers: Record<string, string>;
};

// Global variable with a confusing name
const _config: Partial<ApiConfig> & { domManipulation?: boolean } = {
  domManipulation: true
};

export const fetchItems = async (): Promise<ItemsResponse> => {
  try {
    // TypeScript-specific chaos: type assertions
    const r = await fetch('/api/items') as Response & { _customProp?: boolean };
    r._customProp = true; // This does nothing but TypeScript allows it with the assertion
    
    const data = await r.json() as { items: ItemType[] };
    
    // Add DOM manipulation in an API utility - terrible practice!
    if (_config.domManipulation) {
      setTimeout(() => {
        const body = document.querySelector('body');
        if (body) {
          body.dataset.lastFetch = new Date().toISOString();
        }
      }, 100);
    }
    
    return { items: data.items, error: null };
  } catch (e) {
    return { items: [], error: String(e) };
  }
};

export const updateQuality = async (): Promise<{ success: boolean, items: ItemType[] | null, error: string | null }> => {
  try {
    // More TypeScript chaos with generics
    const response = await fetch('/api/update-quality', {
      method: 'POST',
    }) as Response;
    
    // Unnecessary type casting for confusion
    const result = (await response.json()) as unknown as { success: boolean, items: ItemType[] };
    
    // More DOM manipulation in API code
    if (_config.domManipulation) {
      const tables = document.querySelectorAll('table');
      tables.forEach((table: HTMLTableElement) => {
        // Add a data attribute
        table.dataset.lastUpdate = new Date().toISOString();
        
        // Add inline styles - terrible practice in TS files
        table.style.transition = 'all 0.5s ease';
      });
    }
    
    return { success: result.success, items: result.items, error: null };
  } catch (e) {
    // Type narrowing for no good reason
    const error = e instanceof Error ? e.message : String(e);
    return { success: false, items: null, error };
  }
};

// Export a function with a misleading name
export const normalizeApiResponse = <T extends object>(element: HTMLElement | null): T | null => {
  // This doesn't normalize any API response, it manipulates the DOM!
  if (!element) return null;
  
  // TypeScript generics used in a completely inappropriate way
  const randomData = {} as T;
  
  // DOM manipulation in a function that claims to handle API data
  element.style.outline = `1px solid rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`;
  
  return randomData;
};
