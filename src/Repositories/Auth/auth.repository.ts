import User from '../../Models/Users/user.model';
import { IUser } from '../../Models/interfaces/user';
import Utilities from '../../Utils/helpers';

const util = new Utilities();

export class AuthRepository {
    static User = new User({});

    async signUp(payload: IUser): Promise<IUser> {
        const user: any = await User.create(payload);
        return user as IUser;
    }

    async activateUserAccount(userEmail: string): Promise<IUser> {
        const result: any = await User.findOneAndUpdate(
            { email: userEmail },
            { isEmailVerified: true },
            { new: true }
        );
        return result;
    }

    async resetPassword(
        email: string,
        newPassword: string
    ): Promise<IUser | null> {
        const hashPassword = await util.generateHash(newPassword);

        const updateUserPassword: any = await User.findOneAndUpdate(
            { email },
            { passwordDigest: hashPassword }
        );

        return updateUserPassword;
    }

    async UpdateOTP(
        userEmail: string,
        OTP: number,
        otpExpiresAt: number
    ): Promise<IUser | null> {
        const result: any = await User.findOneAndUpdate(
            { email: userEmail },
            { OTP, otpExpiresAt }
        ).exec();
        return result as IUser;
    }
}

export const authRepository = new AuthRepository();
