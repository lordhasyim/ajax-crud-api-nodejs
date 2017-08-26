var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var products = [
    {
        id: 1,
        name: 'laptop'
    },
    {
        id: 2,
        name: 'microwave'
    }
];
var currentId = 2;

var PORT = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(bodyParser.json());

//route url
app.get('/products', function(req, res) {
    res.send({ products: products });
});

app.post('/products', function(req, res) {
    var productName = req.body.name;
    currentId++;

    products.push({
        id: currentId,
        name: productName
    });
    res.send('Successfully created product');
});

app.put('/products/:id', function (req, res){
    var id = req.params.id;
    var newName = req.body.newName;
    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.name = newName;
        }
    });

    res.send('Successfully updated product')

});

app.delete('/products/:id', function (req,res) {
    var id = req.params.id;
    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    res.send('Successfully Deleted product');
});

app.listen(PORT, function(){
    console.log('server listening on ' + PORT);
});