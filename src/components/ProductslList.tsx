import React, { useState, useEffect, ChangeEvent } from "react";
import ProductService from "../services/ProductService";
import IProductData from '../types/product';
import { Link } from "react-router-dom";
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Array<IProductData>>([]);
  const [currentProduct, setcurrentProduct] = useState<IProductData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retriveProducts();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  console.log("search",searchTitle)
  const retriveProducts = () => {
    ProductService.getAll()
      .then((response: any) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retriveProducts();
    setcurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (Product: IProductData, index: number) => {
    setcurrentProduct(Product);
    setCurrentIndex(index);
  };
  const handleDelete=(id:any)=>{
    ProductService.remove(id)
      .then((response:any) => {
        refreshList()
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  

  const findByTitle = () => {
    ProductService.findByTitle(searchTitle)
      .then((response:any) => {
        setProducts(response.data);
        setcurrentProduct(null);
        setCurrentIndex(-1);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>products List</h4>

        <ul className="list-group">
          {products &&
            products.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

       
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentProduct.title}
            </div>
            <div>
              <label>
                <strong>Category:</strong>
              </label>{" "}
              {currentProduct.category}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {currentProduct.price}
            </div>
            
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentProduct.description}
            </div>
            <Link
              to={"/product/" + currentProduct.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
            <div
              className="badge badge-danger ml-2"
              onClick={()=>handleDelete(currentProduct.id)}
            >
              Delete
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;