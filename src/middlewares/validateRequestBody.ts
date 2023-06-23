import { Request, Response, NextFunction } from 'express';
import accountModel from '../models/accountModel';

const validateRequestBody = async (req: Request, res: Response, next: NextFunction) => {
    const model = accountModel;
    const modelKeys = Object.keys(model.schema.obj);

    // Check for invalid fields in request body
    const invalidKeys = Object.keys(req.body).filter((key) => !modelKeys.includes(key));
    if (invalidKeys.length > 0) {
        const errorMessage = `Invalid fields in request body: ${invalidKeys.join(', ')}`;
        return res.status(400).json({ error: errorMessage });
    }
    const checkIfAccountExist: any = await accountModel.find({ email: req.body.email })
    if (checkIfAccountExist.length > 0) {
        const errorMessage = `Account with email ${req.body.email} already exist`;
        return res.status(400).json({ error: errorMessage });
    }
    const checkIfUserNameExist: any = await accountModel.find({ userName: req.body.userName })
    if (checkIfUserNameExist.length > 0) {
        const errorMessage = `Account with username ${req.body.userName} already exist`;
        return res.status(400).json({ error: errorMessage });
    }
    try {
        // Validate the request body against the Mongoose schema to check for missing required fields
        await model.validate(req.body);
    } catch (error: any) {
        const missingFields = Object.keys(error.errors);
        const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
        return res.status(400).json({ error: errorMessage });
    }

    next();
};

export default validateRequestBody;
