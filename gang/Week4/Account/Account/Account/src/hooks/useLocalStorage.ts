export const useLocalStorage = (key: string) => {
  const setItem = (value: string) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = (): string | null => {
    return localStorage.getItem(key);
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return { setItem, getItem, removeItem };
};
export default useLocalStorage;
