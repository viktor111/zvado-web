export class UserModelConstants {
    static readonly MIN_USERNAME_LENGTH = 3;
    static readonly MAX_USERNAME_LENGTH = 40;
    static readonly MIN_PASSWORD_LENGTH = 5;
    static readonly MAX_PASSWORD_LENGTH = 40;
    static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
}

export class CourseModelConstants {
    static readonly MIN_NAME_LENGTH = 3;
    static readonly MAX_NAME_LENGTH = 60;
    static readonly MIN_DESCRIPTION_LENGTH = 3;
    static readonly MAX_DESCRIPTION_LENGTH = 500;
    static readonly MIN_PRICE = 0;
    static readonly MAX_PRICE = 100000000;
    static readonly MIN_TOTAL_HOURS = 0;
    static readonly MAX_TOTAL_HOURS = 100000000;
    static readonly MIN_PROMO_CODE_LENGTH = 3;
    static readonly MAX_PROMO_CODE_LENGTH = 10;
}

export class VideoModelConstants {
    static readonly MIN_NAME_LENGTH = 3;
    static readonly MAX_NAME_LENGTH = 60;
    static readonly MIN_DESCRIPTION_LENGTH = 3;
    static readonly MAX_DESCRIPTION_LENGTH = 500;
    static readonly MIN_URL_LENGTH = 3;
    static readonly MAX_URL_LENGTH = 500;
    static readonly MIN_DURATION = 0;
    static readonly MAX_DURATION = 100000000;
}