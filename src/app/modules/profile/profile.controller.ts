import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserProfileService } from "./profile.service";


const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.user as { role: string; id: string };
  const result = await UserProfileService.getByIdFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Fetched Successfully!',
    data: result,
  });
});


export const UserProfileController = {
  getByIdFromDB,
};
