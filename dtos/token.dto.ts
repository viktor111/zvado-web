import UserDto from "./user.dto";

export default interface TokenDto{
    user: UserDto;
    iat: number;
    exp: number;
}

