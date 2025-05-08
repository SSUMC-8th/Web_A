export const localStorageUtil = {
    setItem: (key: string, value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log(e);
        }
    },

    getItem: (key: string) => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.log(e);
        }
    },

    removeItem: (key: string) => {
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            console.log(e);
        }
    },
};
