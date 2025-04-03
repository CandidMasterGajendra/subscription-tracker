// err -> info what happens before the request, next -> what happens after request

const errorMiddleware = (err, req, res, next) => {
    try {
        let error  = {...err};
        error.message = err.message;
        console.error(err);

        // Mongodb bad object id
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new error(message);
            error.statusCode = 404;
        }

        // mongodb duplicate key 
        if(err.name === 11000){
            const message = 'Duplicate field value entered';
            error = new error(message);
            error.statusCode = 400;
        }

        // when we are adding an entry and we dont write all the props 
        // mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new error(message.join(', ')); // join it based on comma and spaces
            error.statusCode = 400
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'server error'
        })

    } catch(error){
        next(error);
    }
};

export default errorMiddleware;