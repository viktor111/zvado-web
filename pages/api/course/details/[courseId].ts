import { NextApiRequest, NextApiResponse } from "next";
import CourseRepo from "../../../../repos/course.repo";
import * as pino from "pino";
import ApiError from "../../../../common/api.error";

const logger = pino.default();

const details = async (req: NextApiRequest, res: NextApiResponse) => {
    const { courseId } = req.query;

    try {
        if(!courseId) {
            throw new ApiError("Course id not provided", 404);
        }
        const courseRepo = new CourseRepo();
        const courses = await courseRepo.getCoursesById(courseId as string);
        courses?.removeVideosUrls();
        res.status(200).json(courses);
        return;
    } catch (error) {
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

export default details;