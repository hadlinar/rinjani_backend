const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const user = require('./routes/user.js')
const branch = require('./routes/branch.js')
const customer = require('./routes/customer.js')
const employee = require('./routes/employee.js')
const visit = require('./routes/visit.js')
const role = require('./routes/role.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.json({ test: 'test backend' })
});

app.get('/users', user.getUsers) 
app.get('/branch', branch.getBranch) 
app.get('/customer', customer.getCustomer) 
app.get('/customer_cat', customer.getCustomerCat) 
app.get('/employee', employee.getEmployee) 
app.get('/visit_cat', visit.getVisitCat) 
app.get('/role', role.getRole) 
app.get('/realization', visit.getRealization)
app.get('/visit', visit.getVisit) 

app.listen(port, () => console.log(`backend on port ${port}!`))