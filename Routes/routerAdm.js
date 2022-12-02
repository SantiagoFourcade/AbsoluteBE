const express = require(`express`)
const {admDeleteProdById, admGetProd, admGetProdById, admPatchProdById, admPostProd,admPutProdById, soloParaAdmin
} = require(`../Controladores/controladoresAdm`)

const routerAdm = express.Router()

routerAdm.get(`/login/`, admGetProd)
routerAdm.get(`/login/:id`, admGetProdById)
routerAdm.post(`/login/`, admPostProd)
routerAdm.delete(`/login/:id`, admDeleteProdById)
routerAdm.put(`/login/:id`, admPutProdById)
routerAdm.patch(`/login/:id`, admPatchProdById)

