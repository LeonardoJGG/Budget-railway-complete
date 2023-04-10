import { sequelize } from "../db/db.js";
import { Account } from "../models/Account.js";
import { User } from "../models/User.js";

export const createAccount = async (req, res) => {

    try {
        const { authorization } = req.headers;

        if(!req.body.currency || !req.body.balance){
            return res.status(400).send({
                message: 'missing required data',
                success: false
            });
        }

        const { name, currency, balance } = req.body;

        const parseJwt = (token) => {
            
            var base64Url = token.split('.')[1];
            var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(base64);
        }

        const decoded = parseJwt(authorization);

        const userId = req.user.id;

        const checkUser = await User.findOne({where: { id: userId }});
        console.log(currency);

        if(!checkUser){

            return res.status(404).send({
                success: false,
                message: 'User not found!'
            });
        }

        const newAccount = await Account.build({
            name: name,
            currency: currency,
            balance: balance,
            user_id: userId
        }).save();

        res.send({
            success: true,
            message: 'Account Created Successfully',
            id: newAccount.getDataValue('id')
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Account creation failed'
        });
    }

}



export const deleteAccount = async (req, res) => {

    try {
        const account_id = req.params.id;

        const remove = await sequelize.query('DELETE FROM Accounts WHERE id = ?', account_id)

        res.status(200).send({
            success: true,
            message: 'Account was delete succesfully',
            remove: account_id
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }

}

export const getAccounts = async (req, res) => {

    try {

        const { authorization } = req.headers;

        const parseJwt = (token) => {
            
            var base64Url = token.split('.')[1];
            var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(base64);
        }

        const decoded = parseJwt(authorization);
        const userId = decoded.id;

        const accounts = await Account.findAll({ where: { user_id: userId } });

        if(!accounts){
            return res.status(404).json({
                message: 'User not found!',
                succes:false
            });
        }

        if(accounts.length == 0){
            return res.status(404).json({
                message: 'You have no accounts!',
                succes:false
            });
        }

        return res.status(200).json({
            succes: true,
            message: 'These are your accounts :)',
            accounts: accounts
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            succes: false,
            message: 'Could not get your accounts'
        })
    }
}