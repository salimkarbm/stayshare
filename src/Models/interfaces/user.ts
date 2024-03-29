export interface IUser {
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
    gender?: string;
    phoneNumber: string;
    occupation?: string;
    state?: string;
    city?: string;
    NIN?: string;
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

export interface IUpdateUser {
    email: string;
    firstName: string;
    lastName: string;
    occupation: string;
    state: string;
    city: string;
    gender: string;
    phoneNumber: string;
    bio?: string;
    address?: string;
    profileImageId?: string;
    profileImage?: string;
}
