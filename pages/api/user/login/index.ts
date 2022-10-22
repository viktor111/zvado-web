import { NextApiRequest, NextApiResponse } from "next";
import ApiError from "../../../../common/api.error";
import * as pino from "pino";

const logger = pino.default();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {}
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

export default login;