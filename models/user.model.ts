import Guard from "../common/guard";
import { UserModelConstants } from "../common/constants";

class UserModel {
    constructor(username: string, email: string, password: string) {
        this.validate(username, email, password);
        
        this.username = username;
        this.email = email;
        this.password = password;
    }

    private username: string;
    private email: string;
    private password: string;

    public getUsername() {
        return this.username;
    }

    public getEmail() {
        return this.email;
    }

    public getPassword() {
        return this.password;
    }

    public updateUsername(username: string) {
        this.validatePassword(username);
        this.username = username;
    }

    public updateEmail(email: string) {
        this.validateEmail(email);
        this.email = email;
    }

    public updatePassword(password: string) {
        this.validatePassword(password);
        this.password = password;
    }

    private validateUsername(username: string) {
        Guard.againstInvalidString(username, "username");
        Guard.againstOutOfRange(
            username,
            UserModelConstants.MIN_USERNAME_LENGTH,
            UserModelConstants.MAX_USERNAME_LENGTH,
            "username"
        );
    }

    private validateEmail(email: string) {
        Guard.againstInvalidString(email, "email");
        Guard.againstRegEx(
            email,
            UserModelConstants.EMAIL_REGEX,
            "email");
    }

    private validatePassword(password: string) {
        Guard.againstInvalidString(password, "password");
        Guard.againstOutOfRange(
            password,
            UserModelConstants.MIN_PASSWORD_LENGTH,
            UserModelConstants.MAX_PASSWORD_LENGTH,
            "password"
        );
    }

    private validate(username: string, email: string, password: string) {
        this.validateUsername(username);
        this.validateEmail(email);
        this.validatePassword(password);
    }
}

export default UserModel;
