const jwt = require('jsonwebtoken');
require('dotenv').config(); 

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const deocodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = deocodedToken.userId;
        res.locals.acces = deocodedToken.acces;
        res.locals.userId = userId
        next()
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifié'})
        console.log(req.headers.authorization );
    }
};