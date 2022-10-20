export class UserModelConstants {
    static readonly MIN_USERNAME_LENGTH = 3;
    static readonly MAX_USERNAME_LENGTH = 40;
    static readonly MIN_PASSWORD_LENGTH = 5;
    static readonly MAX_PASSWORD_LENGTH = 40;
    static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
}