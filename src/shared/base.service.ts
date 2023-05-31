export interface BaseService {
  create(payload: any);
  update(payload: any);
  delete(payload: any);
  getList(payload: any);
  findOne(payload: any);
}
