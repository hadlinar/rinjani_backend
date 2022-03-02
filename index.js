const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.json({ test: 'test backend' })
});

app.get('/users', db.getUsers) //done
app.get('/branch', db.getBranch) //done
app.get('/customer', db.getCustomer) //done
app.get('/customer_cat', db.getCustomerCat) //done
app.get('/employee', db.getEmployee) //done
app.get('/visit_cat', db.getVisitCat) //done
app.get('/role', db.getRole) 
app.get('/realization', db.getRealization)
app.get('/visit', db.getVisit) 

app.listen(port, () => console.log(`backend on port ${port}!`))