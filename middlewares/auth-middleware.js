const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service')

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizdError())
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
             return next(ApiError.UnauthorizdError())
        }

        const userData = tokenService.validateAccesToken(accessToken);
        if(!userData) {
             return next(ApiError.UnauthorizdError())
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizdError())
    }   
}