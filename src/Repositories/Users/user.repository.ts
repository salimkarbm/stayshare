import User from '../../Models/Users/user.model';
import { IUser, IUpdateUser } from '../../Models/interfaces/user';

export class UserRepository {
    static User = new User({});

    async createUser(user: IUser) {
        const data = await User.create(user);
        return data;
    }

    async findUser(email: string): Promise<IUser> {
        const user: any = await User.findOne({ email });
        return user;
    }

    async findUserById(userId: string): Promise<IUser> {
        const user: any = await User.findById(userId);
        return user;
    }

    async findUserByPhone(phoneNumber: string): Promise<IUser> {
        const user: any = await User.findOne({ phoneNumber });
        return user;
    }

    async findUserByEmail(email: string): Promise<IUser> {
        /**
         * This method returns an object of user data
         */
        const data: any = await User.findOne({
            email
        });
        return data as IUser;
    }

    async findUserByCodeAndEmail(
        OTP: number | string,
        email: string
    ): Promise<IUser> {
        /**
         * This method returns an object of user data
         */
        const data: any = await User.findOne({
            OTP,
            email
        });
        return data;
    }

    async findUserByCode(verificationCode: string): Promise<IUser> {
        /**
         * This method returns an object of user data
         */
        const data: any = await User.findOne({
            verificationCode
        });
        return data;
    }

    async updateUser(payload: IUpdateUser, userId: string): Promise<IUser> {
        const users: any = await User.findByIdAndUpdate(userId, payload, {
            new: true
        });
        return users as IUser;
    }

    async getUsers(): Promise<IUser> {
        const users: any = await User.find();
        return users as IUser;
    }

    async deactivateUser(id: string): Promise<IUser> {
        const modify: any = await User.findOneAndUpdate(
            { _id: id },
            { $set: { isEmailVerified: false } },
            { new: true }
        );
        return modify as IUser;
    }

    async deleteUser(id: string): Promise<IUser> {
        const result: any = await User.findOneAndDelete(
            { _id: id },
            { new: true }
        );
        return result as IUser;
    }

    async UpdatePassword(id: string, password: string): Promise<IUser | null> {
        const result: any = await User.findOneAndUpdate(
            { _id: id },
            { passwordDigest: password }
        )
            .select('-OTP')
            .exec();
        return result as IUser;
    }
}

export const userRepository = new UserRepository();
