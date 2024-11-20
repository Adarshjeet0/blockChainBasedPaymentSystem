import UserModel from './user.schema.js';
export default class UserRepository{
    async signUp(name, email,password){
        const newUser = new UserModel({name,email,password});
        await newUser.save();
        return newUser;
    }
    async signIn(email,password){
        const user = new UserModel({name,email,password});
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
}