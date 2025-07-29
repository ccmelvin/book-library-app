import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  test('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('initialValue');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  test('returns parsed value from localStorage if it exists', () => {
    mockLocalStorage.setItem('testKey', JSON.stringify('storedValue'));
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('storedValue');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  test('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(result.current[0]).toBe('newValue');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
  });

  test('handles objects as values', () => {
    const initialObject = { name: 'John', age: 30 };
    const { result } = renderHook(() => useLocalStorage('testObject', initialObject));
    
    expect(result.current[0]).toEqual(initialObject);
    
    const newObject = { name: 'Jane', age: 25 };
    act(() => {
      result.current[1](newObject);
    });
    
    expect(result.current[0]).toEqual(newObject);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('testObject', JSON.stringify(newObject));
  });

  test('handles arrays as values', () => {
    const initialArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage('testArray', initialArray));
    
    expect(result.current[0]).toEqual(initialArray);
    
    const newArray = [4, 5, 6];
    act(() => {
      result.current[1](newArray);
    });
    
    expect(result.current[0]).toEqual(newArray);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('testArray', JSON.stringify(newArray));
  });

  test('handles function updates', () => {
    const { result } = renderHook(() => useLocalStorage<number>('testCounter', 0));
    
    act(() => {
      result.current[1](prev => prev + 1);
    });
    
    expect(result.current[0]).toBe(1);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('testCounter', JSON.stringify(1));
  });

  test('handles localStorage parsing errors', () => {
    // Set invalid JSON in localStorage
    mockLocalStorage.getItem.mockReturnValueOnce('{invalid json}');
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    // Should fall back to initial value
    expect(result.current[0]).toBe('initialValue');
  });
});
