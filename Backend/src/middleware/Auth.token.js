import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    
    try {
    
        const jwtSecret = process.env.JWT_SECRET;
        const { authorization } = req.headers;
        console.log(authorization);
        
        if(!authorization || !authorization.startsWith('Bearer ')){
            return res.status(401).json({
                message: 'Not Authorized!',
                succes: false
            })
        }

        const token = authorization.split('Bearer ')[1];
        console.log(token);
        
        jwt.verify(token, jwtSecret, (err, decoded) => {

            if(err){
                res.status(401).json({
                    message: `${err}`,
                    succes: false
                })
            } else{

                req.user = { id: decoded.id };
                next();
            }
        });
            
    } catch (error) {
        console.log('b');
        res.status(401).json({
            message: 'Authentication process failed',
            error
        })
    }
}