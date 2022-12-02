const {randomUUID} = require("crypto");
let Admin = false

const prod = [{
    titulo:"titulo",
    precio:"precio",
    img:"img",
    stock:"stock"
}];

function soloParaAdmin(req, res, next) {
    if(Admin) {
        next()
    } else {
        res.sendStatus(403)
    }
}

function rango (num, min = 0, max = 100000) {
    return num >= min && num <= max;
}

function admGetProd({query}, res) {
    let resultado;
    if(query.min || query.max) {
        resultado = prod.filter(({precio}) => rango(precio, query.min, query.max))
    } else {
        resultado = prod;
    }
    res.json(resultado)
}

function admPostProd(req, res) {
    console.log(req);
    const nuevoProd = req.body;
    nuevoProd.ID=randomUUID();
    prod.push(nuevoProd)
    res.status(201)
    res.json(nuevoProd)
}

function admGetProdById({params: {id}}, res) {
    const buscado = prod.find(c=>c.id===id)
    if(!buscado) {
        res.status(404)
        res.json({mensaje:`no se encontro el producto con el ID (${id})`})
    } else {
        res.json(buscado)
    }
}

function admPutProdById({body, params:{id}}, res) {
    const indiceBuscado = prod.findIndex(c=>c.id===id)
    if(indiceBuscado===-1) {
        res.status(404)
        res.json({mensaje:`no se encontro el producto con el ID (${id})`})
    } else {
        prod[indiceBuscado] = body
        res.json(body)
    }
}

function admPatchProdById({body, params: {id}}, res) {
    if(indiceBuscado===-1) {
        res.status(404)
        res.json({mensaje:`no se encontro el producto con el ID (${id})`})
    } else {
        prod[indiceBuscado] = {...prod[indiceBuscado], ...body}
        res.json(prod[indiceBuscado])
    }
}

function admDeleteProdById ({body, params:{id}}, res) {
    if(indiceBuscado===-1) {
        res.status(404)
        res.json({mensaje:`no se encontro el producto con el ID (${id})`})
    } else {
        const borrados = prod.splice(indiceBuscado, 1)
        res.resStatus(204)
    }
}

exports.admDeleteProdById = admDeleteProdById;
exports.admPatchProdById = admPatchProdById;
exports.admGetProd = admGetProd;
exports.admGetProdById = admGetProdById;
exports.admPostProd = admPostProd;
exports.admPutProdById = admPutProdById;
exports.soloParaAdmin = soloParaAdmin;