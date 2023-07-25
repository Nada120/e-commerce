
module.exports = ({stateCode = 500 , code , message })=>{
    const CustomError = new Error(message)
    CustomError.code = code,
    CustomError.status = stateCode
    return CustomError
}