export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

type MergeKeysOnly<T1, T2> = { [K in keyof T1]: T1[K] } & {
	[K in Exclude<keyof T2, keyof T1>]?: never;
};
export type DiscriminatedUnion<T1, T2> =
	| MergeKeysOnly<T1, T2>
	| MergeKeysOnly<T2, T1> extends infer R
	? { [K in keyof R]: R[K] }
	: never;
