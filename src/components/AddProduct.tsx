import React, { useState, ChangeEvent } from "react";
import ProductService from "../services/ProductService";
import IProductData from '../types/product';

const AddProduct: React.FC = () => {
  const initialProductState = {
  title: "",
  category: "",
  price: "",
  description: "",
  };
  const [product, setProduct] = useState<IProductData>(initialProductState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };
  console.log("product",product)
   const saveproduct=()=>{
        var data = {
      title: product.title,
      category:product.category,
      price:product.price,
      description: product.description,
    };
       ProductService.create(data)
      .then((response: any) => {
        setProduct({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          category:response.data.category,
          price:response.data.price
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
   }
  // const saveproduct = () => {
  //   var data = {
  //     title: product.title,
  //     description: product.description
  //   };

  //   productDataService.create(data)
  //     .then((response: any) => {
  //       setProduct({
  //         id: response.data.id,
  //         title: response.data.title,
  //         description: response.data.description,
  //         published: response.data.published
  //       });
  //       setSubmitted(true);
  //       console.log(response.data);
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // };

  const newproduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newproduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={product.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Category</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={product.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Price</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveproduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};


export default AddProduct;