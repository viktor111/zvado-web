class Guard {
    static againstNullOrUndefined(value: any, name: string): void {
        if (value === null || value === undefined) {
            throw new Error(`${name} cannot be null or undefined`);
        }
    }
    static againstOutOfRange(value: string | number, min: number, max: number, name: string): void {
        if(typeof value === 'string'){
            if (value.length < min || value.length > max) {
                throw new Error(`${name} must be between ${min} and ${max}`);
            }
        }
        else if(typeof value === 'number'){
            if (value < min || value > max) {
                throw new Error(`${name} must be between ${min} and ${max}`);
            }
        }
    }

    static againstMin(value: string | number, min: number, name: string): void {
        if(typeof value === 'string'){
            if (value.length < min) {
                throw new Error(`${name} must be at least ${min}`);
            }
        }
        else if(typeof value === 'number'){
            if (value < min) {
                throw new Error(`${name} must be at least ${min}`);
            }
        }
    }

    static againstMax(value: string | number, max: number, name: string): void {
        if(typeof value === 'string'){
            if (value.length > max) {
                throw new Error(`${name} must be at most ${max}`);
            }
        }
        else if(typeof value === 'number'){
            if (value > max) {
                throw new Error(`${name} must be at most ${max}`);
            }
        }
    }

    static againstAtLeastOne(value: any[], name: string): void {
        if (value.length === 0) {
            throw new Error(`${name} must have at least one item`);
        }
    }

    static againstAtMostOne(value: any[], name: string): void {
        if (value.length > 1) {
            throw new Error(`${name} must have at most one item`);
        }
    }

    static againstInvalidString(value: string, name: string): void {
        if (value === null || value === undefined || value === "") {
            throw new Error(`${name} cannot be null, undefined or empty`);
        }
    }

    static againstRegEx(value: string, regEx: RegExp, name: string): void {
        if (!regEx.test(value)) {
            throw new Error(`${name} is not matching the pattern`);
        }
    }
}

export default Guard;