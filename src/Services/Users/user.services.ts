import { Request, NextFunction } from 'express';
import { IUser } from '../../Models/interfaces/user';
import AppError from '../../Utils/Errors/appError';
import HttpStatusCode from '../../Utils/httpStatusCodes/httpStatusCode';
import { userRepository } from '../../Repositories/Users/user.repository';
import Media from '../../Utils/Media/media';
import Utilities from '../../Utils/helpers';
import { IAccommodation } from '../../Models/interfaces/accomodation';
import { accomodationRepository } from '../../Repositories/Accommodations/accommodation.repository';

const util = new Utilities();
const media = new Media();
const statusCode = new HttpStatusCode();

export default class UserService {
    public async viewProfile(
        req: Request,
        next: NextFunction
    ): Promise<IUser | void> {
        const { id, email } = req.user;
        if (id) {
            const profile = await userRepository.findUserByEmail(email);
            if (profile && profile.id === id) {
                return profile;
            }
            return next(
                new AppError('Profile not found', statusCode.notFound())
            );
        }
        return next(
            new AppError(
                'You are not logged in. please login to again access',
                statusCode.unauthorized()
            )
        );
    }

    public async getUsers(
        req: Request,
        next: NextFunction
    ): Promise<IUser | void> {
        const { id } = req.user;
        if (id) {
            const user = await userRepository.getUsers();

            return user;
        }
        return next(
            new AppError(
                'You are not logged in. please login to again access',
                statusCode.unauthorized()
            )
        );
    }

    public async getUser(
        req: Request,
        next: NextFunction
    ): Promise<IUser | void> {
        const { id } = req.user;
        if (id) {
            const user = await userRepository.findUserById(id);
            if (user && user.id === id) {
                return user;
            }
            return next(new AppError('User not found', statusCode.notFound()));
        }
        return next(
            new AppError(
                'You are not logged in. please login to again access',
                statusCode.unauthorized()
            )
        );
    }

    public async deleteUser(
        req: Request,
        next: NextFunction
    ): Promise<IUser | void> {
        const { id, role } = req.user;
        if (id) {
            const user = await userRepository.findUserByEmail(req.body.email);
            if ((user && user.id === id) || role.toLowerCase() === 'admin') {
                const result = await userRepository.deleteUser(id);
                return result;
            }
            return next(new AppError('User not found', statusCode.notFound()));
        }
        return next(
            new AppError(
                'You are not logged in. please login to again access',
                statusCode.unauthorized()
            )
        );
    }

    public async deActivateUser(
        req: Request,
        next: NextFunction
    ): Promise<IUser | void> {
        const { id, role } = req.user;
        if (id) {
            const user = await userRepository.findUserById(id);
            if ((user && user.id === id) || role.toLowerCase() === 'admin') {
                const result = await userRepository.deactivateUser(id);
                return result;
            }
            return next(new AppError('User not found', statusCode.notFound()));
        }
        return next(
            new AppError(
                'You are not logged in. please login to again access',
                statusCode.unauthorized()
            )
        );
    }

    public async updateUser(
        req: Request,
        next: NextFunction
    ): Promise<IUser | void> {
        const { id } = req.user;
        if (id) {
            const user: any = await userRepository.findUserById(id);
            let cloudinary;
            if (user.profileImageId) {
                await media.cloudinaryDestroy(user.profileImageId);
            }
            const filepath = media.getFilePath(req);
            if (filepath) {
                cloudinary = await media.cloudinaryUpload(filepath);
            }

            if (user && user.id === id) {
                const payload = {
                    email: req.body.email || user.email,
                    firstName: req.body.firstName || user.firstName,
                    lastName: req.body.lastName || user.lastName,
                    NIN: req.body.NIN || user.NIN,
                    occupation: req.body.occupation || user.occupation,
                    gender: req.body.gender || user.gender,
                    state: req.body.state || user.state,
                    city: req.body.city || user.city,
                    phoneNumber: req.body.phoneNumber || user.phoneNumber,
                    bio: req.body.bio || user.bio,
                    address: req.body.address || user.address,
                    profileImageId:
                        cloudinary?.public_id || user.profileImageId,
                    profileImage: cloudinary?.secure_url || user.profilePicture
                };
                const newUser = await userRepository.updateUser(
                    payload,
                    user.id as string
                );
                return newUser;
            }
            return next(new AppError('User not found', statusCode.notFound()));
        }
        return next(
            new AppError(
                'You are not logged in. please login to again access',
                statusCode.unauthorized()
            )
        );
    }

    public async changePassword(
        req: Request,
        next: NextFunction
    ): Promise<any> {
        const { id } = req.user;
        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(
                new AppError('password does not match', statusCode.badRequest())
            );
        }
        const user = await userRepository.findUserById(id);
        const isPassword = await util.comparePassword(
            req.body.currentPassword,
            user?.passwordDigest as string
        );
        if (isPassword) {
            const hashPassword = await util.generateHash(req.body.newPassword);
            const updatedPassword = await userRepository.UpdatePassword(
                id as unknown as string,
                hashPassword
            );
            return updatedPassword as IUser;
        }
        return next(
            new AppError(
                'current password does not match',
                statusCode.badRequest()
            )
        );
    }

    public async getUserAccommodations(
        req: Request,
        next: NextFunction
    ): Promise<IAccommodation[] | void> {
        const { id } = req.user;
        if (id) {
            const accommodations: any =
                await accomodationRepository.getUserAccommodations(id);
            return accommodations as IAccommodation[];
        }
        return next(
            new AppError(
                'You are not permitted to perform this operation',
                statusCode.unauthorized()
            )
        );
    }
}

export const userService = new UserService();
