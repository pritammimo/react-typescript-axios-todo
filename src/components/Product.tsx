import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import ProductService from "../services/ProductService";
import IProductData from "../types/product";

const Tutorial:React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialProductState = {
  title: "",
  category: "",
  price: "",
  description: "",
  };
  const [currentProduct, setCurrentProduct] = useState<IProductData>(initialProductState);
  const [message, setMessage] = useState<string>("");
  console.log("curre",currentProduct)
  const getTutorial = (id: any) => {
    ProductService.get(id)
      .then((response: any) => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updateTutorial = (id:any) => {
    ProductService.update(id, currentProduct)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteTutorial = (id:any) => {
    ProductService.remove(id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/products");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentProduct.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Category</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Price</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
              />
            </div>

          </form>

        
          <button
            type="submit"
            className="badge badge-success mr-2"
            onClick={()=>updateTutorial(currentProduct.id)}
          >
            Update
          </button>
          <button className="badge badge-danger" onClick={()=>deleteTutorial(currentProduct.id)}>
            Delete
          </button>

         
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;