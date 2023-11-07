export type ListCarPartTypesDTO = BaseRequestParams & {
  status?: string;
};

export type CarPartType = BaseMongooseType & {
  attribute?: Language<CarPartTypeAttribute>;
  status?: string;
};

export type CarPartTypeAttribute = {
  name?: string;
  image?: string;
};

export type CreateCarPartTypeDTO = {
  status: string;
  attribute: Language<CarPartTypeAttribute>;
};

export type UpdateCarPartTypeDTO = {
  status: string;
  attribute?: Language<CarPartTypeAttribute>;
};
