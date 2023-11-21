import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        occupation: {
            type: String
        },
        address: {
            type: String
        },
        NIN: {
            type: Number
        },
        otpExpiresAt: {
            type: Number
        },
        description: {
            type: String
        },

        profileImage: {
            type: String,
            default:
                'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        },
        profileImageId: {
            type: String
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin']
        },
        passwordDigest: {
            type: String
        },
        OTP: {
            type: Number
        },
        isActive: {
            type: Boolean,
            default: true,
            select: false
        },

        tokens: { type: Object }
    },
    { timestamps: true }
);

export default model('User', UserSchema);
