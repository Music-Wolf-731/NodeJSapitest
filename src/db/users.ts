import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{ type: String, required: true },
    email: { type:String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select:false },
        sessionToken: { type:String, select: false },
    },
});

export const UserModel = mongoose.model('User' , UserSchema);

// 獲取所有用戶
export const getUsers = () => UserModel.find();

// 根據郵箱獲取用戶
export const getUserByEmail = (email:string) => UserModel.findOne({ email });

// 根據會話令牌獲取用戶
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken' : sessionToken,
});

// 根據 ID 獲取用戶
export const getUserById = (id: string) => UserModel.findById(id);

// 創建新用戶
export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());

// 根據 ID 刪除用戶
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

// 根據 ID 更新用戶
    export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)