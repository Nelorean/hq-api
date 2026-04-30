const Employee = require('../models/Employee')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async(req,res)=>{
  try {
    const {name,email,password,department,position,salary,role} = req.body

    const exist = await Employee.findOne({email})
    if (exist) {
      return res.status(400).json({message: 'Email já cadastrado'})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const employee = await Employee.create({
      name,
      email,
      password:hashedPassword,
      position,
      salary,
      role
    })
    
    res.status(201).json({message: 'Funcionário criado com sucesso', id:employee._id})
  } catch (error) {
    res.status(500).json({message: 'Erro ao criar funcionário'})
  }
}

const login = async (req,res)=>{
  try {
    const {email,password} = req.body

    const employee = await Employee.findOne({email})
    if (!employee) {
      return res.status(401).json({message: 'Email ou senha inválidos'})
    }

    if (employee.status=== 'inativo') {
      return res.status(402).json({message: 'Funcionário desligado'})
    }
    
    const passwordMatch = await bcrypt.compare(password,employee.password)
    if (!passwordMatch) {
      return res.status(401).json({message: 'Email ou senha inválidos'})
    }

    const token = jwt.sign(
      {id:employee._id, role:employee.role},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    )
    
    res.json({token});
  } catch (error) {
    res.status(500).json({message: 'Erro ao faezr login'})
  }
}
module.exports = {register, login}
