const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors());

let recipes = {
    'cochinita-pibil': {
        'name': 'Cochinita Pibil',
        'ingredients': ['annatto seed', 'clove' ] 
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get('/api/recipes/:ingredient', (req, res) => {
    const ingredient = req.params.ingredient.toLowerCase()
    if (recipes[ingredient]) {
        res.json(recipes[ingredient])
    } else {
        res.json(recipes['not found'])
    }
});

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));