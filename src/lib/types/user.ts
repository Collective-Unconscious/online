import * as v from "valibot";

export interface User {
	accountId: string;
	name: string;
	createdAt: string;
}

const UserSchema = v.object({
	AccountID: v.pipe(v.string(), v.uuid()),
	Username: v.string(),
	CreatedAt: v.pipe(v.string(), v.isoTimestamp()),
});
export const UserTransform = v.pipe(
	UserSchema,
	v.transform((a) => ({
		accountId: a.AccountID,
		name: a.Username,
		createdAt: a.CreatedAt,
	})),
);
