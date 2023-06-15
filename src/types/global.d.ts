export {};

declare global {
  declare type User = {
    id: number;
    userType: number;
    language?: string;
  };
}
