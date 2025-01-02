import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getCurrentUsername from "../services/getCurrentUsername";
import { useParams } from 'react-router-dom';
import Navbar from '../templates/navbar';

const EditMyProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantityAvailable: '',
        category: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(id);
            const { data } = await axios.get(`http://localhost:5000/api/products/get-product-by-id/${id}`);
            if (data.sellerUsername !== getCurrentUsername()) {
                alert('You do not have permission to edit this product.');
                return;
            }
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/products/update-product/${id}`, product)
            .then(() => alert('Product updated successfully.'))
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Navbar />
            <h1>Edit Product:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Quantity Available</label>
                    <input
                        type="text"
                        name="quantityAvailable"
                        value={product.quantityAvailable}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditMyProduct;