import ApiError from "./api.error";

class Guard {
    static againstNullOrUndefined(value: any, name: string, statusCode: number): void {
        if (value === null || value === undefined) {
            throw new ApiError(`${name} cannot be null or undefined`, statusCode);
        }
    }
    static againstOutOfRange(value: string | number, min: number, max: number, name: string, statusCode: number): void {
        if(typeof value === 'string'){
            if (value.length < min || value.length > max) {
                throw new ApiError(`${name} must be between ${min} and ${max}`, statusCode);
            }
        }
        else if(typeof value === 'number'){
            if (value < min || value > max) {
                throw new ApiError(`${name} must be between ${min} and ${max}`, statusCode);
            }
        }
    }

    static againstMin(value: string | number, min: number, name: string, statusCode: number): void {
        if(typeof value === 'string'){
            if (value.length < min) {
                throw new ApiError(`${name} must be at least ${min}`, statusCode);
            }
        }
        else if(typeof value === 'number'){
            if (value < min) {
                throw new ApiError(`${name} must be at least ${min}`, statusCode);
            }
        }
    }

    static againstMax(value: string | number, max: number, name: string, statusCode: number): void {
        if(typeof value === 'string'){
            if (value.length > max) {
                throw new ApiError(`${name} must be at most ${max}`, statusCode);
            }
        }
        else if(typeof value === 'number'){
            if (value > max) {
                throw new ApiError(`${name} must be at most ${max}`, statusCode);
            }
        }
    }

    static againstAtLeastOne(value: any[], name: string, statusCode: number): void {
        if (value.length === 0) {
            throw new ApiError(`${name} must have at least one item`, statusCode);
        }
    }

    static againstAtMostOne(value: any[], name: string, statusCode: number): void {
        if (value.length > 1) {
            throw new ApiError(`${name} must have at most one item`, statusCode);
        }
    }

    static againstInvalidString(value: string, name: string, statusCode: number): void {
        if (value === null || value === undefined || value === "") {
            throw new ApiError(`${name} cannot be null, undefined or empty`, statusCode);
        }
    }

    static againstRegEx(value: string, regEx: RegExp, name: string, statusCode: number): void {
        if (!regEx.test(value)) {
            throw new ApiError(`${name} is not matching the pattern`, statusCode);
        }
    }
}

export default Guard;