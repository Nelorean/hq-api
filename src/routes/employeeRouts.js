const express = require('express')
const router = express.Router()
const {getAll,getBydId,update,dismiss,payroll} = require('../controllers/employeeController')
const authMiddleware = (require('../middlewares/authMiddleware'))
const adminMiddleware = (require('../middlewares/adminMiddleware'))

router.use(authMiddleware)

router.get('/',adminMiddleware,getAll)
router.put('/:id',adminMiddleware,update)
router.patch('/:id/dismiss',adminMiddleware,update)
router.get('/payroll',adminMiddleware,payroll)

router.get('/:id',getBydId)

module.exports = router