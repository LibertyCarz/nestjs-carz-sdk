export * from './dto';
export * from './services';

export type TCareer = BaseMongooseType & {
  categories: Array<string>;
  name: Language;
  status: string;
  description: Language;
  vacancy: number;
  jobType: string;
  updatedBy: number;
  deadLine: Date;
  workingDays: BaseRange;
  workingHours: BaseRange;
};
