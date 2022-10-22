import { NextApiRequest, NextApiResponse } from "next";
import * as pino from "pino";
import validateIds from "../../../../common/validateIds";
import CourseRepo from '../../../../repos/course.repo';
import { ApiError } from "next/dist/server/api-utils";

const logger = pino.default();
// courseId/userId
const watch = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ids } = req.query;
    try{
        const validIds = validateIds(ids, 2);
        const userId = validIds[0];
        const courseId = validIds[1];
        logger.info(`User ${userId} is watching course ${courseId}`);

        const courseRepo = new CourseRepo();
        const isCourseOwnedByUser = await courseRepo.isOwnedByUser(courseId, userId);

        if(!isCourseOwnedByUser) {
            throw new ApiError(403, "User does not own this course");
        }

        const course = await courseRepo.getCoursesById(courseId);

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