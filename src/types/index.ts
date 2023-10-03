import { HttpService } from '@nestjs/axios';

export type HttpServiceRequest = Parameters<HttpService['request']>[0];

export type SdkFile = {
  path?: string;
  type?: string;
  owner?: number;
};

export type PostAdditionalAttributes = {
  views?: number;
  likes?: number;
  comments?: number;
};

export type Post = BaseMongooseType & {
  name?: string;
  content?: string;
  user?: number;
  userType?: number;
  updateBy?: number;
  authorName?: string;
  updateByName?: string;
  status?: string;
  files?: SdkFile[];
  app?: string;
  additionalAttributes?: PostAdditionalAttributes;
};

export type Comment = BaseMongooseType & {
  post: string | Post;
  text: string;
  image?: string;
  user: number;
  userType: number;
  parent?: string | Comment;
  node?: string;
  status?: string;
};
