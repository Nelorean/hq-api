const express = require('express')
const router = express.Router()
const {getAll,getById,update,dismiss,payroll} = require('../controllers/employeeController')
const authMiddleware = (require('../middlewares/authMiddleware'))
const adminMiddleware = (require('../middlewares/adminMiddleware'))

router.use(authMiddleware)

router.get('/',adminMiddleware,getAll)
router.put('/:id',adminMiddleware,update)
router.patch('/:id/dismiss',adminMiddleware,dismiss)
router.get('/payroll',adminMiddleware,payroll)

router.get('/:id',getById)

module.exports = router