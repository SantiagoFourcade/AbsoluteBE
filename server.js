const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let Admin = false
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({}));

const products = [
    {
        id: 1,
        nombre:"Absolute Colors",
        precio:"1500",
        img:"https://www.absolut.com/globalassets/images/products/absolut-rainbow/2022_product_absolut_rainbow_1000ml.jpg",
        stock:20,
    },
    {
        id: 2,
        nombre:"Absolute Raspberri",
        precio:"1500",
        img:"https://www.absolut.com/globalassets/images/products/absolut-grapefruit/atlas/ingredient_absolut-grapefruit_1000ml_row_packshot.jpg",
        stock:20,
    },
    {
        id: 3,
        nombre:"Absolute Apeach",
        precio:"1500",
        img:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/363/921/products/ace6a1b7-a50e-48ce-a453-9001e7ac09e5_nube-8ff53179f07ca2517516109829519004-1024-1024.jpg",
        stock:20,
    },
    {
        id: 4,
        nombre:"Absolute Blackcurrant",
        precio:"1500",
        img:"https://www.absolut.com/globalassets/images/products/absolut-kurant/absolut-kurant_1000ml4x.jpg",
        stock:20,
    },
    {
        id: 5,
        nombre:"Absolute Mango",
        precio:"1500",
        img:"https://onlydrinks.com.ar/wp-content/uploads/2020/07/OD-ABSOLUT-2-WEB.png",
        stock:20,
    },
    {
        id: 6,
        nombre:"Absolute Watermelon",
        precio:"1500",
        img:"https://www.absolut.com/wp-content/uploads/ingredient_absolut-watermelon_1000ml_ROW_packshot.jpg",
        stock:20,
    },
    {
        id: 7,
        nombre:"Absolute Vainilla",
        precio:"1500",
        img:"https://http2.mlstatic.com/D_NQ_NP_949943-MLA49876657193_052022-O.webp",
        stock:20,
    },
    {
        id: 8,
        nombre:"Absolute Pears",
        precio:"1500",
        img:"https://www.espaciovino.com.ar/media/default/0001/55/thumb_54567_default_medium.jpeg",
        stock:22,
    },
    {
        id: 9,
        nombre:"Absolute Graperfruit",
        precio:"1500",
        img:"https://vinotecaligier.com/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/b/e/be73372.jpg",
        stock:5,
    },
    {
        id: 10,
        nombre:"Absolute",
        precio:"1500",
        img:"http://d3ugyf2ht6aenh.cloudfront.net/stores/001/399/084/products/vodka-absolut1-d29865b556ffab271016113720788308-640-0.png",
        stock:12,
    },
];

//Routes

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("api/shoppingcart", (req, res) => {
    res.send(products);
})

app.post("/api/pay", (req, res) => {
    const ids = req.body;
    const productsCopy = products.map((p) => ({...p}));
    ids.forEach(id => {
        const product = products.find(p => p.id === id);
        if(product.stock > 0) {
        product.stock--;
        } else {
            throw "Sin stock";
        }
    });
    products = productsCopy
    res.send(products);
  });

app.use("/", express.static("views"));

//Solo Admin
function soloParaAdmin(req, res, next) {
    if(Admin) {
        next()
    } else {
        res.sendStatus(403)
    }
}

app.post(`/login`, (req, res) => {
    Admin = true
    res.sendStatus(200)
})

app.post(`/logout`, (req, res) => {
    Admin = false
    res.sendStatus(200)
})

app.get(`/publico`, (req, res) => {
    res.send(`Esto es un endpoint publico`)
})

app.post(`/privado`, soloParaAdmin, (req, res) => {
    res.send(`Esto es un endpoint privado`)
})

app.all(`*`, (req, res) => {
    res.status(404).json(/*no implementada!*/)
})


//Localhost
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});