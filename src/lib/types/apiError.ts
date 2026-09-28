import * as v from "valibot";

export interface ApiError {
	error: string,
}

const ApiErrorSchema = v.object({ Error: v.string() });
export const ApiErrorTransform = v.pipe(ApiErrorSchema, v.transform(a => ({
	error: a.Error
})))
