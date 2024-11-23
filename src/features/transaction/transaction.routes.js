import express from 'express';
import TransactionController from './transaction.controller.js';

const transactionController = new TransactionController();

export const transactionRouter = express.Router() 

transactionRouter.post('/send-money/:senderId', (req, res)=>{
    transactionController.sendMoney(req,res);
})
transactionRouter.get('/transaction-history/:userId', (req, res)=>{
    transactionController.transactionHistory(req,res);
})