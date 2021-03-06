const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = (err, req, res, next) => {

    let error = {...err}

    error.message = err.message

    if(err.kind === 'ObjectId') {
        const message = `Task not found with the id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 404)
    }
    

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = asyncHandler;