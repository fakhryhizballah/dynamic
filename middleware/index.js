const jwt = require('jsonwebtoken');
module.exports = {
    driver: async (req, res, next) => {
        try {
            const token = (req.headers['authorization']).split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.driver = decoded;
            let access_token = await req.cache.get(`token:driver:${decoded.phone}`);
            if (access_token !== token) {
                return res.status(401).json({
                    status: false,
                    message: 'Unauthorized',
                    data: null
                });
            }
            next();
        } catch (err) {
            return res.status(401).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
}