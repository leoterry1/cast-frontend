export const UserRole = {
    ADMIN: "admin",
    REGULAR: "regular"
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
