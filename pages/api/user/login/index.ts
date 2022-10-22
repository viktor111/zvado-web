import { NextApiRequest, NextApiResponse } from "next";
import ApiError from "../../../../common/api.error";
import * as pino from "pino";
import UserRepo from "../../../../repos/user.repo";
import jwt from "jsonwebtoken";

const logger = pino.default();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, password } = req.body;
        const userRepo = new UserRepo();
        var user = await userRepo.userLogin(email, password);
        jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
            res.status(200).json({ token });
        });
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

export default login;