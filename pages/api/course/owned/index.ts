import { NextApiRequest, NextApiResponse } from "next";
import CourseRepo from "../../../../repos/course.repo";
import * as pino from "pino";
import ApiError from "../../../../common/api.error";
import UserRepo from '../../../../repos/user.repo';
import jwt from "jsonwebtoken";
import TokenDto from '../../../../dtos/token.dto';
import tokenToDataHelper from "../../../../helpers/token.helper";

const logger = pino.default();

const all = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authData = tokenToDataHelper(req);

        const courseRepo = new UserRepo();
        const courses = await courseRepo.getUserCourses(authData.user.id);
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
}

export default all;