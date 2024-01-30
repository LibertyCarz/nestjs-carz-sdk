export type CustomFile = {
  path: string;
  type: string;
};

export class PostCreateDto {
  name: string;
  content: string;
  files: CustomFile[];
  user: number;
  updateBy: number;
  authorName: string;
  updateByName: string;
}

export enum POST_STATUS {
  PENDING = 'pending',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  REJECTED = 'rejected',
  DELETED = 'deleted',
}
export class PostUpdateDto {
  status: POST_STATUS;
  updateBy: number;
  updateByName: string;
}
