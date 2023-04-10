import { config } from "dotenv";
import { Account } from "../models/Account.js";
import { Operation } from "../models/Operation.js";
import { Transfer } from "../models/Transfer.js";

export const addTransfer = async (req, res) => {
    config();

    try {
        const {  currency, amount, account_id, to_account_id } = req.body;
        const date = new Date();


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

        const fromBalanceUpdate = await Account.findOne({ where: { id: account_id }});

        if(!fromBalanceUpdate){

            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            });
        }
        fromBalanceUpdate.decrement(['balance'], {by: amount});


        const toBalanceUpdate = await Account.findOne({ where: { id: to_account_id }});

        if(!toBalanceUpdate){

            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            });
        }
        toBalanceUpdate.increment(['balance'], {by: amount});

        const checkUserAccount = await Account.findAll({
            where: { user_id: userId },
        });
        
        if(account_id === to_account_id){
            return res.status(500).send({
                message:"It is not possible to transfer to the same account",
                success: false
            })
        }

        if(account_id.currency !== to_account_id.currency){
            return res.status(500).send({
                message:"You can't do transfer to different currency account",
                success: false
            })
        }
        
        if(checkUserAccount.length < 2){
            return res.status(500).send({
                message:"You don't have accounts you can transfer to",
                success: false
            })
        }

        if(checkUserAccount){
            const newTransfer = await Transfer.build({
                date: date,
                currency: currency,
                amount: amount,
                account_id: account_id,
                to_account_id: to_account_id
            }).save();

            const origin_transfer = await Operation.build({
                date: date,
                category: 'transfer',
                type: 'expense',
                amount: amount,
                account_id: account_id,
                user_id: userId
            }).save();

            const to_transfer = await Operation.build({
                date: date,
                category: 'transfer',
                type: 'income',
                amount: amount,
                account_id: to_account_id,
                user_id: userId
            }).save();

            return res.status(200).send({
                success: true,
                message: 'Transfer Created Successfully',
                id: newTransfer.getDataValue('id'),
                origin_account: origin_transfer.getDataValue('account_id'),
                to_transfer: to_transfer.getDataValue('account_id'),
            })
            
        }else{
            return res.status(404).send({
                message:"This user dont have accounts!"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "An error has ocurred!"
        });
    }

}



export const addExchangeUsd = async (req, res) => {
    config();

    try {
        const {  currency, amount, account_id, to_account_id } = req.body;
        const date = new Date();


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

        const fromBalanceUpdate = await Account.findOne({ where: { id: account_id }});

        if(!fromBalanceUpdate){

            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            });
        }
        fromBalanceUpdate.decrement(['balance'], {by: amount});


        const toBalanceUpdate = await Account.findOne({ where: { id: to_account_id }});

        if(!toBalanceUpdate){

            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            });
        }
        toBalanceUpdate.increment(['balance'], {by: amount * 25});

        const checkUserAccount = await Account.findAll({
            where: { user_id: userId },
        });
        
        if(account_id === to_account_id){
            return res.status(500).send({
                message:"It is not possible to transfer to the same account",
                success: false
            })
        }
        
        if(checkUserAccount.length < 2){
            return res.status(500).send({
                message:"You don't have accounts you can transfer to",
                success: false
            })
        }

        if(checkUserAccount){
            const newTransfer = await Transfer.build({
                date: date,
                currency: currency,
                amount: amount,
                account_id: account_id,
                to_account_id: to_account_id
            }).save();

            const origin_transfer = await Operation.build({
                date: date,
                category: 'transfer',
                type: 'expense',
                amount: amount,
                account_id: account_id,
                user_id: userId
            }).save();

            const to_transfer = await Operation.build({
                date: date,
                category: 'transfer',
                type: 'income',
                amount: amount * 25,
                account_id: to_account_id,
                user_id: userId
            }).save();

            return res.status(200).send({
                success: true,
                message: 'Transfer Created Successfully',
                id: newTransfer.getDataValue('id'),
                origin_account: origin_transfer.getDataValue('account_id'),
                to_transfer: to_transfer.getDataValue('account_id'),
            })
            
        }else{
            return res.status(404).send({
                message:"This user dont have accounts!"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "An error has ocurred!"
        });
    }

}



export const addExchangeVef = async (req, res) => {
    config();

    try {
        const {  currency, amount, account_id, to_account_id } = req.body;
        const date = new Date();


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

        const fromBalanceUpdate = await Account.findOne({ where: { id: account_id }});

        if(!fromBalanceUpdate){

            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            });
        }
        fromBalanceUpdate.decrement(['balance'], {by: amount });


        const toBalanceUpdate = await Account.findOne({ where: { id: to_account_id }});

        if(!toBalanceUpdate){

            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            });
        }
        toBalanceUpdate.increment(['balance'], {by: amount / 25 });

        const checkUserAccount = await Account.findAll({
            where: { user_id: userId },
        });
        
        if(account_id === to_account_id){
            return res.status(500).send({
                message:"It is not possible to transfer to the same account",
                success: false
            })
        }
        
        if(checkUserAccount.length < 2){
            return res.status(500).send({
                message:"You don't have accounts you can transfer to",
                success: false
            })
        }

        if(checkUserAccount){
            const newTransfer = await Transfer.build({
                date: date,
                currency: currency,
                amount: amount,
                account_id: account_id,
                to_account_id: to_account_id
            }).save();

            const origin_transfer = await Operation.build({
                date: date,
                category: 'transfer',
                type: 'expense',
                amount: amount,
                account_id: account_id,
                user_id: userId
            }).save();

            const to_transfer = await Operation.build({
                date: date,
                category: 'transfer',
                type: 'income',
                amount: amount / 25 ,
                account_id: to_account_id,
                user_id: userId
            }).save();

            return res.status(200).send({
                success: true,
                message: 'Transfer Created Successfully',
                id: newTransfer.getDataValue('id'),
                origin_account: origin_transfer.getDataValue('account_id'),
                to_transfer: to_transfer.getDataValue('account_id'),
            })
            
        }else{
            return res.status(404).send({
                message:"This user dont have accounts!"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "An error has ocurred!"
        });
    }

}