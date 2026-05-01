# 👥 HQ API

API REST para gerenciamento de funcionários com controle de acesso por níveis (admin/employee), desenvolvida com Node.js, Express e MongoDB.

## 🌐 Deploy

API disponível em: https://hq-api-7xw7.onrender.com

## 🚀 Tecnologias

- **Node.js** + **Express** — servidor e roteamento
- **MongoDB** + **Mongoose** — banco de dados
- **JSON Web Token (JWT)** — autenticação
- **Bcryptjs** — criptografia de senhas
- **Dotenv** — variáveis de ambiente

## 📁 Estrutura do Projeto

```
hq-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js instalado
- Conta no [MongoDB Atlas]

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/Nelorean/hq-api.git

# Entre na pasta
cd hq-api

# Instale as dependências
npm install

# Crie o arquivo .env baseado no .env.example
cp .env.example .env
```

Preencha o arquivo `.env` com suas credenciais:

```env
MONGODB_URI=sua_uri_do_mongodb_atlas
PORT=3000
JWT_SECRET=sua_chave_secreta
```

```bash
# Rode o servidor em modo desenvolvimento
npm run dev
```

A API estará disponível em `http://localhost:3000`

## 🔐 Níveis de Acesso

| Role | Permissões |
|------|-----------|
| `admin` | Acesso total — listar, buscar, atualizar, desligar funcionários e gerar relatórios |
| `employee` | Acesso restrito — visualiza apenas seus próprios dados |

Para acessar rotas protegidas, inclua o token JWT no header:

```
Authorization: Bearer <seu_token>
```

## 📌 Endpoints

### Auth

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Cadastrar funcionário |
| POST | `/auth/login` | Fazer login e receber token |

#### Registro — `POST /auth/register`
```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "password": "123456",
  "department": "TI",
  "position": "Desenvolvedor",
  "salary": 5000,
  "role": "employee"
}
```

#### Login — `POST /auth/login`
```json
{
  "email": "joao@empresa.com",
  "password": "123456"
}
```
Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

### Employees (🔒 requer token)

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| GET | `/employees` | Admin | Listar funcionários ativos |
| GET | `/employees/payroll` | Admin | Relatório de folha de pagamento |
| GET | `/employees/:id` | Admin + próprio | Buscar funcionário por ID |
| PUT | `/employees/:id` | Admin | Atualizar dados do funcionário |
| PATCH | `/employees/:id/dismiss` | Admin | Desligar funcionário |

#### Filtros disponíveis — `GET /employees`

```
/employees?department=TI
/employees?position=Desenvolvedor
/employees?search=joao
/employees?department=TI&search=silva
```

#### Atualizar — `PUT /employees/:id`
```json
{
  "name": "João Silva Santos",
  "department": "TI",
  "position": "Tech Lead",
  "salary": 8000
}
```

#### Relatório — `GET /employees/payroll`
Resposta:
```json
{
  "total_funcionarios": 10,
  "total_folha": 65000,
  "funcionarios": [...]
}
```

## 🌱 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `MONGODB_URI` | String de conexão do MongoDB Atlas |
| `PORT` | Porta do servidor (padrão: 3000) |
| `JWT_SECRET` | Chave secreta para assinar os tokens JWT |
