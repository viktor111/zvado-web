import { NextApiRequest, NextApiResponse } from "next";
import * as pino from "pino";
import ApiError from "../../../../common/api.error";
import CourseRepo from "../../../../repos/course.repo";
import CourseModel from '../../../../models/course.model';
import tokenToDataHelper from "../../../../helpers/token.helper";

const logger = pino.default();

const update = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authData = tokenToDataHelper(req);
        if(!authData.user.isAdmin){
            throw new ApiError("User is not admin", 403);
        }
        const { courseId } = req.query;
        const { name, description, price, image, totalHours } = req.body;
        if(!courseId) {
            throw new ApiError("Course id not provided", 404);
        }
        const newCourse = new CourseModel("", name, description, price, image, totalHours);
        const courseRepo = new CourseRepo();
        const updatedCourse = await courseRepo.updateCourse(courseId as string, newCourse);
        res.status(200).json(updatedCourse);
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

export default update;