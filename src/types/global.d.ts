export {};

declare global {
  declare type User = {
    user: number;
    userType: number;
    language?: string;
  };
}
