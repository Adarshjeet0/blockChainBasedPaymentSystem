import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    senderId:mongoose.Schema.Types.ObjectId,

    receiverId: mongoose.Schema.Types.ObjectId,

    amount: Number

},
{
    timestamps:true,
})

const TransactionModel = mongoose.model('transactions', transactionSchema);
export default TransactionModel;