import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../store';

function AddProduct() {
  // component level state for controlled inputs
  const [data, setData] = useState({
    id: Date.now(),
    title: '',
    price: 0,
    rating: 0,
    description: '',
    category: '',
    thumbnail: '',
  });

  // RTK Query hook for POST request
  const [addProduct] = useAddProductMutation();

  // hook for programmatic navigation
  const navigate = useNavigate();

  // onchange handlers
  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setData({ ...data, title: e.target.value });
    }
    if (e.target.name === 'price') {
      setData({ ...data, price: Number(e.target.value) });
    }
    if (e.target.name === 'rating') {
      setData({ ...data, rating: Number(e.target.value) });
    }
    if (e.target.name === 'description') {
      setData({ ...data, description: e.target.value });
    }
    if (e.target.name === 'category') {
      setData({ ...data, category: e.target.value });
    }
    if (e.target.name === 'thumbnail') {
      setData({ ...data, thumbnail: e.target.value });
    }
  };

  // onsubmit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // calling mutation function with payload to initiate POST request
    addProduct(data);
    toast.success('Product added to DB!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'dark',
    });
    navigate('/');
  };

  return (
    <WrapperPage className="page">
      <Wrapper>
        <div className="container">
          <h3>add a product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                id="price"
                value={data.price || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                name="rating"
                id="rating"
                value={data.rating || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                name="category"
                id="category"
                value={data.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail">Thumbnail:</label>
              <input
                type="text"
                name="thumbnail"
                id="thumbnail"
                value={data.thumbnail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                id="description"
                rows="2"
                cols="50"
                value={data.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn">
              add product
            </button>
          </form>
        </div>
      </Wrapper>
    </WrapperPage>
  );
}

// styled components
const WrapperPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clr-black);
`;
const Wrapper = styled.div`
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255 255, 255, 0.8);
  padding: 20px;
  margin: 2rem 0;
  max-width: 600px;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h3 {
    text-align: center;
    margin-bottom: 1rem;
    color: var(--clr-white);
  }
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--clr-white);
  }
  input,
  textarea {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
    margin-top: 0.25rem;
  }
`;

export default AddProduct;
