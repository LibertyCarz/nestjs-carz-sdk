export type ListCarPartTypesDTO = BaseRequestParams & {
  status?: string;

  ids?: string;
};

export type CarPartType = BaseMongooseType & {
  attribute?: Language<CarPartTypeAttribute>;
  status?: string;
  image?: string;
};

export type CarPartTypeAttribute = {
  name?: string;
};
