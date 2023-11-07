import { CarPart } from '../types';

export type CreateCarPartMerchantDTO = Partial<CarPart> & { partType: string };
