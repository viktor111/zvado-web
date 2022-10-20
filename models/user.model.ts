import Guard from "../common/guard";
import { UserModelConstants } from "../common/constants";

class UserModel {
    constructor(id: string, username: string, email: string, password: string, isAdmin: boolean) {
        this.validate(username, email, password);
        
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    private id: string;
    private username: string;
    private email: string;
    private password: string;
    private isAdmin: boolean;

    public getId() {
        return this.id;
    }

    public getUsername() {
        return this.username;
    }

    public getEmail() {
        return this.email;
    }

    public getPassword() {
        return this.password;
    }

    public getIsAdmin() {
        return this.isAdmin;
    }

    public updateId(id: string) {
        this.id = id;
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

    public makeAdmin() {
        this.isAdmin = true;
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
