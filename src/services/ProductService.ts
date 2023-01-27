import http from "../http-common";
import IProductData from "../types/product";

const getAll = () => {
  return http.get<Array<IProductData>>("/products");
};

const get = (id:number) => {
  return http.get<IProductData>(`/products/${id}`);
};

const create = (data: IProductData) => {
  return http.post<IProductData>("/products", data);
};

const update = (id:any, data: IProductData) => {
  return http.put<IProductData>(`/products/${id}`, data);
};

const remove = (id:number) => {
  return http.delete<number>(`/products/${id}`);
};

const findByTitle = (title: string) => {
  return http.get<Array<IProductData>>(`/products?title_like=${title}`);
};

const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle,
};

export default ProductService;