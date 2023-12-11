export * from './dto';
export * from './services';

export class Career implements BaseMongooseType {
  _id?: string;
  updatedAt?: Date;
  createdAt?: Date;
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
  experience: string;
  constructor(data?: Partial<Career>) {
    if (data) {
      this._id = data?._id;
      this.categories = data?.categories;
      this.name = data?.name;
      this.description = data?.description;
      this.status = data?.status;
      this.vacancy = data?.vacancy;
      this.updatedBy = data?.updatedBy;
      this.deadLine = data?.deadLine;
      this.workingDays = data?.workingDays;
      this.workingHours = data?.workingHours;
      this.experience = data?.experience;
    }
  }
}
