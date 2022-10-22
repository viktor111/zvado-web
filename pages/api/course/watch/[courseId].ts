import { NextApiRequest, NextApiResponse } from "next";
import * as pino from "pino";
import validateIds from "../../../../common/validateIds";
import CourseRepo from '../../../../repos/course.repo';
import { ApiError } from "next/dist/server/api-utils";
import tokenToDataHelper from "../../../../helpers/token.helper";

const logger = pino.default();
const watch = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { courseId } = req.query;
        const authData = tokenToDataHelper(req);
        const userId = authData.user.id;
        logger.info(`User ${userId} is watching course ${courseId}`);

        const courseRepo = new CourseRepo();
        const isCourseOwnedByUser = await courseRepo.isOwnedByUser(courseId as string, userId);

        if(!isCourseOwnedByUser) {
            throw new ApiError(403, "User does not own this course");
        }

        const course = await courseRepo.getCoursesById(courseId as string);

        res.status(200).json(course);
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

export default watch;