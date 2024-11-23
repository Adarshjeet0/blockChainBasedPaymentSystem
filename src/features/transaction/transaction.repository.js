import mongoose from 'mongoose';
import UserModel from '../users/user.schema.js';
import TransactionModel  from './transaction.schema.js';

export default class TransactionRepository {
    // Check if the sender has enough balance
    async hasSufficientBalance(senderId, amount) {
        const sender = await UserModel.findById(senderId);
        if (!sender) throw new Error('Sender not found.');
        return sender.amount >= amount;
    }

    // Update the sender's and receiver's balances
    async updateBalances(senderId, receiverId, amount) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Deduct amount from sender
            const sender = await UserModel.findByIdAndUpdate(
                senderId,
                { $inc: { amount: -amount } },
                { new: true, session }
            );
            if (!sender) throw new Error('Sender not found.');

            // Add amount to receiver
            const receiver = await UserModel.findByIdAndUpdate(
                receiverId,
                { $inc: { amount: amount } },
                { new: true, session }
            );
            if (!receiver) throw new Error('Receiver not found.');

            await session.commitTransaction();
            session.endSession();

            return { sender, receiver };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    // Save the transaction
    async createTransaction(senderId, receiverId, amount) {
        const transaction = new TransactionModel({
            senderId,
            receiverId,
            amount,
        });
        return transaction.save();
    }

    async transactionHistory(targetId) {
        try {
            // Replace `Transaction` with your database model or query logic
            const history = await TransactionModel.find({ $or: [{ senderId: targetId }, { receiverId: targetId }] })
                .sort({ createdAt: -1 }) // Sort transactions by most recent
                .lean(); // Optional: Converts MongoDB documents to plain JavaScript objects
    
            return history;
        } catch (error) {
            console.error("Error fetching transaction history from the database:", error);
            throw new Error("Database query failed");
        }
    }
    
}
