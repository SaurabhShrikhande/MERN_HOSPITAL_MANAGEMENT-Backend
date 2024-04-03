//insted of that use try catch block

export const catchAsyncErrors = (theFunction) => {
    return (req, res, next) => {
        Promise.resolve(theFunction(req, res , next)).catch(next);
    }
}