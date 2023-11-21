// import paginate from 'express-paginate';
// import { Utilities, StatusCode } from '../utils/helpers';
// import AppError from '../services/Errors/appErrors';

// const geAllUsers = async (req: any, res: Response, next: NextFunction) => {
//     try {
//       let limit: number = 2;
//       if (req.query.limit) {
//         limit = parseFloat(req.query.limit);
//       }
//       const allUsers = await UserData.getAll(req.query.limit);
//       const pageCount = Math.ceil(allUsers.itemCount - limit);
//       if (!allUsers) {
//         return res.status(Statuscode.notFound()).json({
//           success: false,
//           error: 'No user found'
//         });
//       } else {
//         return res.json({
//           success: true,
//           object: 'List',
//           has_more: paginate.hasNextPages(req)(pageCount),
//           data: allUsers.results,
//           pageCount,
//           itemCount: allUsers.itemCount,
//           currentPage: req.query.page,
//           pages: paginate.getArrayPages(req)(
//             2,
//             pageCount,
//             req.query.page as unknown as number
//           )
//         }).statusCode;
//       }
//     } catch (error) {
//       return next(
//         new AppError(
//           `something went wrong here is the error ${error}`,
//           Statuscode.internalServerError()
//         )
//       );
//     }
//   };

//   const viewProfile = async (req: any, res: Response, next: NextFunction) => {
//     const currentUser = req.user;
//     try {
//       const user = await UserData.findOneUser(currentUser.email);
//       let profile = {
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         phone: user.phoneNumber,
//         gender: user.gender,
//         image: user.image,
//         NIN: user.NIN,
//         occupation: user.occupation,
//         address: user.address,
//         description: user.description
//       };

//       return res.status(Statuscode.ok()).json({
//         success: true,
//         profile
//       });
//     } catch (error) {
//       return next(
//         new AppError(
//           `something went wrong, here is the error ${error}`,
//           Statuscode.internalServerError()
//         )
//       );
//     }
//   };

//   const editProfile = async (req: any, res: Response, next: NextFunction) => {
//     try {
//       const currentUser = req.user;
//       const {
//         email,
//         phone,
//         firstName,
//         lastName,
//         gender,
//         address,
//         NIN,
//         occupation,
//         description
//       } = req.body;
//       const phoneNumber = phone;
//       const filePath = Utility.getFilePath(req);
//       const profile = {
//         firstName,
//         lastName,
//         email,
//         phoneNumber,
//         gender,
//         address,
//         NIN,
//         occupation,
//         description,
//         image: filePath
//       };

//       await User.findByIdAndUpdate(currentUser.id, profile, {
//         new: true,
//         runValidators: true
//       });
//       return res.status(Statuscode.accepted()).json({
//         message: 'update successful',
//         success: true
//       });
//     } catch (error) {
//       return next(
//         new AppError(
//           `something went wrong, here is the error ${error}`,
//           Statuscode.internalServerError()
//         )
//       );
//     }
//   };

//   const deleteAUser = async (req: any, res: Response, next: NextFunction) => {
//     try {
//       const user = await UserData.deleteUser(req.body.email);
//       return res.status(Statuscode.accepted()).json({
//         success: true,
//         message: 'User Successfully deleted'
//       });
//     } catch (error) {
//       return next(
//         new AppError(
//           `something went wrong here is the error ${error}`,
//           Statuscode.internalServerError()
//         )
//       );
//     }
//   };
