import { config } from "dotenv";
import { Account } from "../models/Account.js";
import { Operation } from "../models/Operation.js";

export const addIncome = async (req, res) => { 
    config();

    try {

        const { authorization } = req.headers;

        if(!req.body.category || !req.body.amount){
            return res.status(400).send({
                message: 'missing required data',
                success: false
            });
        }

        const { category, amount, account_id } = req.body;
        const date = new Date();

        const parseJwt = (token) => {
                    
            var base64Url = token.split('.')[1];
            var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            return JSON.parse(base64);
        }
        
        const decoded = parseJwt(authorization);
        const userId = decoded.id;

        const balanceUpdate = await Account.findOne({ where: { id: account_id }});

        if(!balanceUpdate){

            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            });
        }

        balanceUpdate.increment(['balance'], {by: amount});

        const newOperation = await Operation.build({
            date: date,
            category: category,
            type: 'income',
            amount: amount,
            account_id: account_id,
            user_id: userId
        }).save();

        res.send({
            success: true,
            message: 'Operation Created Successfully',
            id: newOperation.getDataValue('id')
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Operation failed'
        });
    }


}

export const addExpense = async (req, res) => {
    config();

    try {

        const { authorization } = req.headers;

        if(!req.body.category || !req.body.amount){
            return res.status(400).send({
                message: 'missing required data',
                success: false
            });
        }

        const { category, amount, account_id } = req.body;

        const date = new Date();

        const parseJwt = (token) => {
                    
            var base64Url = token.split('.')[1];
            var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            return JSON.parse(base64);
        }
        
        const decoded = parseJwt(authorization);
        const userId = decoded.id;

        const balanceUpdate = await Account.findOne({ where: { id: account_id }});

        if(!balanceUpdate){

            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            });
        }

        balanceUpdate.decrement(['balance'], {by: amount});

        const newOperation = await Operation.build({
            date: date,
            category: category,
            type: 'expense',
            amount: amount,
            account_id: account_id,
            user_id: userId,
        }).save();

        res.send({
            success: true,
            message: 'Operation Created Successfully',
            id: newOperation.getDataValue('id')
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Operation failed'
        });
    }
}

export const getHistory = async (req, res) => {

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

        const operations = await Operation.findAll({ where: { user_id: userId } });

        if(!operations){
            return res.status(404).json({
                message: 'User not found!',
                success:false
            });
        }

        if(operations.length == 0){
            return res.status(404).json({
                message: 'You have no operations!',
                success:false
            });
        }

        return res.status(200).json({
            success: true,
            message: 'These are your operations :)',
            operations: operations
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: 'Could not get your operations'
        })
    }
}