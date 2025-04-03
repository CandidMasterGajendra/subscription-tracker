import aj from '../config/arcjet.js';

const arcjetMiddleware = async(req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested: 1});
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({
                    error: 'rate limit exceeded'
                });
            };

            if(decision.reason.isBot()){
                res.status(403).json({
                    error: 'bot denied'
                })
            };

            res.status(403).json({
                error: 'access denied'
            });
        }

        next();
    } catch(err){
        console.log(`arcjet middleware error: ${err}`);
        next(err);
    }
}

export default arcjetMiddleware;