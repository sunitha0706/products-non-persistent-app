
import express from "express";

const app = express();

app.use(express.json());

let products = [];
let nextId = 1;

// Add a product
app.post("/products", (req, res) => {
    const { name, price, quantity } = req.body;

    const product = {
        id: nextId++,
        name,
        price,
        quantity
    };

    products.push(product);

    res.status(201).json({
        message: "Product added successfully",
        data: product
    });
});

// Get all products
app.get("/products", (req, res) => {
    res.json({
        message: "All products fetched successfully",
        data: products
    });
});

// Get product by ID
app.get("/products/:id", (req, res) => {
    const product = products.find(
        p => p.id === Number(req.params.id)
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json({
        message: "Product fetched successfully",
        data: product
    });
});

// Update product
app.put("/products/:id", (req, res) => {
    const product = products.find(
        p => p.id === Number(req.params.id)
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, quantity } = req.body;

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.quantity = quantity ?? product.quantity;

    res.json({
        message: "Product updated successfully",
        data: product
    });
});

// Delete product
app.delete("/products/:id", (req, res) => {
    const index = products.findIndex(
        p => p.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(index, 1);

    res.json({
        message: "Product deleted successfully"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Products Non-Persistent App running on port ${PORT}`);
});
