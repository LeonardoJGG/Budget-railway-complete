import bcrypt from 'bcrypt';
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {

    try {
        if(!req.body.email || !req.body.password){
            return res.status(404).send({
                success: false,
                message: 'missing required data'
            })
        }

        const { email, password } = req.body;

        const checkUser = await User.findOne({ where: { email } });

        if(!checkUser){
            return res.status(404).send({
                success: false,
                message: 'User not found!'
            })
        }

        const checkPassword = await bcrypt.compare(password, checkUser.getDataValue('password'));

        if(!checkPassword){
            return res.status(404).send({
                success: false,
                message: 'Incorrect password!'
            });
        }
       
        const jwtSecret = process.env.JWT_SECRET;
      
        const authToken = jwt.sign({ id: checkUser.id}, jwtSecret, { expiresIn: '3h' });

        res.cookie('authorization', authToken);

        return res.status(200).json({
            token: authToken,
            success: true,
            message: "Login Successfull",
        })

          

    } catch (err) {
        res.status(400).send({
            message: 'error',
            success: false
        })
    }
}

export const Register = async (req, res) => {
    try {
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).send({
                message: 'missing required data',
                success: false
            })
        }
    
        const { name, email, password } = req.body ;
    
        const alreadyExist = await User.findOne({ where: { email } });

        if(alreadyExist) {
            return res.status(400).send({
                message: 'This user already exist',
                success: false
            })
        }

        const hash_password = await bcrypt.hash(password, 10);

        const newUser = await User.build({
            name: name,
            email: email,
            password: hash_password
        }).save();

        res.send({
            success: true,
            message: 'User Created Successfully',
            name: newUser.getDataValue('name'),
            email: newUser.getDataValue('email'),
            user_id: newUser.getDataValue('id')
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'User creation failed'
        });
    }
}