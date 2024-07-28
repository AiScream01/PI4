const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {

        if (process.env.MODE === 'development') {
            console.log('\x1b[30m\x1b[2mcheckToken bypassed (dev mode)\x1b[0m');
            next()
            return;
        }

        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!token) {
            console.log('token niete', req.headers)
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Token indisponível.'
            })
            return
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length); //remove a palavra 'Bearer '
        }

        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'O token não é válido.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    }
}

