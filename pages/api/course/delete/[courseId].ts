import { NextApiRequest, NextApiResponse } from "next";
import * as pino from "pino";
import ApiError from "../../../../common/api.error";
import CourseRepo from "../../../../repos/course.repo";

const logger = pino.default();

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { courseId } = req.query;
        if(!courseId) {
            throw new ApiError("Course id not provided", 404);
        }
        const courseRepo = new CourseRepo();
        const course = await courseRepo.getCoursesById(courseId as string);
        if(!course) {
            throw new ApiError("Course not found", 404);
        }
        course.getVideos().forEach(video => courseRepo.deleteVideo(video.getId()));
        const deletedCourse = await courseRepo.deleteCourse(courseId as string);
        res.status(200).json(deletedCourse);
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

export default deleteHandler;