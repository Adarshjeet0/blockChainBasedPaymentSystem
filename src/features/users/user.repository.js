import UserModel from './user.schema.js';
export default class UserRepository{
    async signUp(name, email,password, amount){
        const newUser = new UserModel({name,email,password, amount});
        await newUser.save();
        return newUser;
    }
    async signIn(email,password){
        const user = new UserModel({email,password});
        await newUser.save();
        return newUser;
    }

    async findByEmail(email) {
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getUserById(userId){
        try {
            return await UserModel.findById(userId);
        } catch (error) {
            console.log("User not found for this userId");
        }
    }
}