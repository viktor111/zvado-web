import { NextApiRequest, NextApiResponse } from "next";
import ApiError from "../../../../common/api.error";
import * as pino from "pino";
import UserRepo from "../../../../repos/user.repo";
import UserModel from '../../../../models/user.model';
import EmailSender from "../../../../email/email.sender";

const logger = pino.default();

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { username, email, password } = req.body;
        const user = new UserModel("", username, email, password, true);
        const userRepo = new UserRepo();
        const registeredUser = await userRepo.createUser(user);
        EmailSender.sendEmail(registeredUser.email, "Welcome to the zvado web", "You have successfully registered to zvado web");
        res.status(200).json(registeredUser);
        return;
    }
    catch (error) {
        if (error instanceof ApiError) {
            logger.error(error.message);
            res.status(error.statusCode).json({ message: error.message });
            return;
        }
        logger.error(error);
        res.status(500).json({ message: error });
        return;
    }
};

export default register;