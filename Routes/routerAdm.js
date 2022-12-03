const express = require(`express`)
const {admDeleteProdById, admGetProd, admGetProdById, admPatchProdById, admPostProd,admPutProdById, soloParaAdmin
} = require(`../Controladores/controladoresAdm`)

const routerAdm = express.Router()

routerAdm.get(`/login/buscar/`, admGetProd)
routerAdm.get(`/login/buscar/:id`, admGetProdById)
routerAdm.post(`/login/buscar/`, admPostProd)
routerAdm.delete(`/login/buscar/:id`, admDeleteProdById)
routerAdm.put(`/login/buscar/:id`, admPutProdById)
routerAdm.patch(`/login/buscar/:id`, admPatchProdById)

