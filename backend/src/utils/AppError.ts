type AppError = {
    status: number;
    message: string;
    stack: string;
    name?: string;
};

export default AppError;