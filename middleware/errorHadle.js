// const errorHadle = (error, req, res, next) => {
//     const errStatus = error.statusCode || 500;
//     const errMessage = error.message;
    
//     res.status(errStatus).json({
//         success: false,
//         status: errStatus,
//         message: errMessage
//     });
// }

// module.exports = errorHadle;

module.exports = ({stateCod = 500 , code , message })=>{
    const CustomError = new Error(message)
    CustomError.code = code,
    CustomError.status = stateCod
    return CustomError
}