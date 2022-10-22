import ApiError from './api.error';
import Guard from './guard';

const validateIds = (ids: string | string[] | undefined, len: number) : string[] => {
    if(ids === undefined){
        throw new ApiError('ids cannot be undefined', 404);
    }
    if(typeof ids === 'string'){
        throw new ApiError('ids cannot be string', 404);
    }
    if(ids.length !== len){
        throw new ApiError(`ids must have ${len} items`, 404);
    }

    const idsArr = ids as string[];

    return idsArr;
};

export default validateIds;