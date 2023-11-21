export default interface IUser {
    id?: string;
    passwordDigest: string;
    email: string;
    confirmPassword?: string;
    firstName: string;
    lastName: string;
    OTP: number | string;
    isEmailVerified?: boolean;
    createdAt?: string;
    isActive?: boolean;
    role?: string;
    isProfileComplete?: string;
    phoneNumber: string;
    bio?: string;
    address?: string;
    passwordResetOtp?: string | number;
    profilePictureId?: string;
    profilePicture?: string;
    otpExpiresAt?: number;
    readonly length?: number;
    location?: string;
    facebookId?: string;
}
