import { NextApiRequest, NextApiResponse } from "next";
import CourseRepo from "../../../../repos/course.repo";
import CourseModel from '../../../../models/course.model';
import tokenToDataHelper from "../../../../helpers/token.helper";
import ApiError from "../../../../common/api.error";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authData = tokenToDataHelper(req);
        if(!authData.user.isAdmin) {
            throw new ApiError("User is not admin", 403);
        }
        const { name, description, price, image, totalHours } = req.body;
        const course = new CourseModel("",name, description, price, image, totalHours);
        const courseRepo = new CourseRepo();
        const courseCreated = await courseRepo.createCourse(course);
        res.status(200).json(courseCreated);
        return;
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: error });
        return;
    }
}

export default create;