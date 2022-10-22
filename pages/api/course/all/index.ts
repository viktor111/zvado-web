import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import CourseRepo from "../../../../repos/course.repo";
import * as pino from "pino";

const logger = pino.default();

const all = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        
        const courseRepo = new CourseRepo();
        const courses = await courseRepo.getAllCourses();
        courses.forEach(course => course.removeVideosUrls());
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