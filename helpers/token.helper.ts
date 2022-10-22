import { NextApiRequest } from "next";
import * as jwt from 'jsonwebtoken';
import TokenDto from "../dtos/token.dto";
import ApiError from "../common/api.error";


const tokenToDataHelper = (req: NextApiRequest) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        throw new ApiError("User not logged in", 401);  
    }
    const authData = jwt.verify(token, process.env.JWT_SECRET_KEY) as TokenDto;
    return authData;
}

export default tokenToDataHelper;