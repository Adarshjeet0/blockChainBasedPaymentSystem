import TransactionRepository from './transaction.repository.js';

const transactionRepository = new TransactionRepository();

export default class TransactionController {
    async sendMoney(req, res) {
        try {
            console.log(req.body);
            const receiverId  = req.body.receiverId;
            const amount = req.body.amount;
            const { senderId } = req.params;
            // console.log(amount);
            // console.log(senderId);
            // console.log(receiverId);
            // Validate input
            if (!senderId || !receiverId || !amount || amount <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid input data. Provide senderId, receiverId, and a valid amount.',
                });
            }

            if (senderId === receiverId) {
                return res.status(400).json({
                    success: false,
                    message: 'Sender and receiver cannot be the same.',
                });
            }

            // Check sender's balance
            const hasBalance = await transactionRepository.hasSufficientBalance(senderId, amount);
            if (!hasBalance) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient balance.',
                });
            }

            // Update balances and create the transaction
            const updatedBalances = await transactionRepository.updateBalances(senderId, receiverId, amount);
            const transaction = await transactionRepository.createTransaction(senderId, receiverId, amount);

            return res.status(201).json({
                success: true,
                message: 'Transaction completed successfully.',
                data: {
                    transaction,
                    sender: updatedBalances.sender,
                    receiver: updatedBalances.receiver,
                },
            });
        } catch (error) {
            console.error('Error in sendMoney:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error.',
                error: error.message,
            });
        }
    }

    async transactionHistory(req, res) {
        try {
            const targetId = req.params.userId;
            if (!targetId) {
                return res.status(400).json({ success: false, message: "Target ID is required" });
            }
    
            const history = await transactionRepository.transactionHistory(targetId);
    
            if (!history || history.length === 0) {
                return res.status(404).json({ success: false, message: "No transaction history found" });
            }
    
            return res.status(200).json({ success: true, data: history });
        } catch (error) {
            console.error("Error fetching transaction history:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    
}
