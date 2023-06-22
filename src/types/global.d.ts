export {};

declare global {
  namespace SDK {
    export type User = {
      id: number;
      userType: number;
      language?: string;
    };
  }
}
