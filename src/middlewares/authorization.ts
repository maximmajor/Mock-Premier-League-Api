import { Request, Response, NextFunction } from 'express';
import accountModel from '../models/account';
import { HttpException } from './HttpException';



const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user; // Assuming the user ID is stored in the req.user property

  try {
    const user = await accountModel.findOne({ _id: userId }).exec();
    if (!user) {
        throw new HttpException(401,  'Unauthorized' );
    }

    // Check if the user is an admin
    if (user.isAdmin) {
      // User is an admin, call the next middleware
      next();
    } else {
      // User is not an admin, return an error response
      throw new HttpException(401,  'Only admins can perform this action' );
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default authorize;
