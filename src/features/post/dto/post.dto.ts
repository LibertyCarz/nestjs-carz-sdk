export class PostCreateDto {
  name: string;
  content: string;
  files: any[];
  user: number;
  updateBy: number;
  authorName: string;
  updateByName: string;
}

export enum POST_STATUS {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export class PostUpdateDto {
  status: POST_STATUS;
  updateBy: number;
  updateByName: string;
}
