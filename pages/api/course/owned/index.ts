import { NextApiRequest, NextApiResponse } from "next";
import CourseRepo from "../../../../repos/course.repo";
import * as pino from "pino";
import ApiError from "../../../../common/api.error";
import UserRepo from '../../../../repos/user.repo';
import jwt from "jsonwebtoken";
import TokenDto from '../../../../dtos/token.dto';

const logger = pino.default();

const all = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
            throw new ApiError("User not logged in", 401);  
        }
        const authData = jwt.verify(token, 'secretkey') as TokenDto;

        logger.info(`Getting all courses for user ${token}`);
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