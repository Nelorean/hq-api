const Employee = require('../models/Employee')

const getAll = async(req,res)=>{
  try {
    const {department,position,search} = req.body

    const filters ={status:'ativo'}
    if(department) filters.department = department
    if(position) filter.position = position
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    const employess = await Employee.find(filters).select('password')
    res.json(employess)
  } catch (error) {
    res.status(500).json({message: 'Erro ao buscar funcionários'})
  }
}
const getById = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin'
    const targetId = req.params.id

    if (!isAdmin && req.user.id !== targetId) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    const employee = await Employee.findById(targetId).select('-password')
    if (!employee) {
      return res.status(404).json({ message: 'Funcionário não encontrado' })
    }

    res.json(employee)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar funcionário' })
  }
}

const update = async(req,res)=>{
  try {
    const{name,department,position,salary} = req.body
    
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {name,department,position,salary},
      {new:true}
    ).select('-password')

    if (!employee) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar funcionário' });
  }
}

const dismiss = async(req,res)=>{
  try {
    const employee =await Employee.findByIdAndUpdate(
      req.params.id,
      {status:'inativo'},
      {new:true}
    ).select('-password')
    
    if (!employee) {
      return res.status(404).json({message: 'Funcionário não encontrado'})
    }
    
    res.json({message:`Funcionário ${employee.name} desligado com sucesso`})
  } catch (error) {
    res.status(500).json({ message: 'Erro ao desligar funcionário' });
  }

  const payroll = async (req,res)=>{
    try {
      const employees = await Employee.find({status:'ativo'}).select('name position department salary')
    
      const total = employess.reduce((sum,emp)=>sum+emp.salary,0)

      res.json({
        total_funcionários: employees.length,
        total_folha: total,
        funcionrios: employees
      })
    } catch (error) {
      res.status(500).json({message:'Erro ao gerar relatório'})
    }
  }
}

module.exports = { getAll, getById, update, dismiss, payroll };