import type { NextApiRequest, NextApiResponse } from "next";
import UserRepo from "../../../../repos/user.repo";
import * as pino from "pino";
import validateIds from "../../../../common/validateIds";
import ApiError from "../../../../common/api.error";
import tokenToDataHelper from "../../../../helpers/token.helper";

const logger = pino.default();

const buy = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authData = tokenToDataHelper(req);
        const userId = authData.user.id;
        const { courseId } = req.query;
        logger.info(`User ${userId} is buying course ${courseId}`);

        const useRepo = new UserRepo();
        const courses = await useRepo.userBuyCourse(userId, courseId as string);
        logger.info(`User ${userId} bought course ${courseId}`);
        res.status(200).json(courses);
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

export default buy;