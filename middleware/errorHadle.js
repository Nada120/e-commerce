
module.exports = ({stateCode = 500, message}) => {
    const CustomError = new Error(message);
    CustomError.status = stateCode;
    return CustomError;
}