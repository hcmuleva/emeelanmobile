export const useNotificationProvider = {
    open: ({ type, message, description }) => {
        console.log(`[${type}] ${message}: ${description}`);
    },
    close: (key) => {
        console.log(`Closing notification ${key}`);
    },
};
