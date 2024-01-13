import User from '../../Models/Users/user.model';
import IUser from '../../Models/interfaces/user';

export class UserRepository {
    static User = new User({});

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

    async createUser(user: any) {
        const data = await User.create(user);
        return data;
    }

    async findUserByEmail(email: string): Promise<IUser> {
        /**
         * This method returns an object of user data
         */

        const data: any = await User.findOne({
            email
        });
        return data;
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

    async getAll(limit: number) {
        const [results, itemCount] = await Promise.all([
            User.find({})
                .select('_id email firstName LastName phoneNumber image')
                .sort({ createdAt: -1 })
                .limit(limit),
            User.count({})
        ]);

        return { results, itemCount };
    }

    async deactivateUser(email: any) {
        const modify = await User.findOneAndUpdate(
            { email },
            { $set: { isEmailVerified: false } },
            { new: true }
        );
        return modify;
    }

    async deleteUser(email: any) {
        const modify = await User.findOneAndDelete({ email }, { new: true });
        return modify;
    }
}

export const userRepository = new UserRepository();
