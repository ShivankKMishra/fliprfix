const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
const customerController = require('./customer.controller');
const productController = require('./product.controller');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(cors({
  origin: ["https://flipr-software-developer-internship.vercel.app"],
  methods: ["post", "get"],
  credentials: true
}));


require('dotenv').config();


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});





app.get('/api/customers', customerController.getAllCustomers);
app.post('/api/customers', customerController.addCustomer);
app.delete('/api/customers/:id', customerController.deleteCustomer);

app.get('/api/products',productController.getAllProducts);
app.post('/api/products', productController.addProduct);


app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ email: user.email }, process.env.SECRETE_KEY); 
        user.token = token;
        await user.save();

        return res.json({ status: 'ok', user });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: 'error', message: 'Incorrect password' });
        }

        const token = jwt.sign({ email: user.email }, process.env.SECRETE_KEY); 
        user.token = token;
        await user.save();

        return res.json({ status: 'ok', message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
