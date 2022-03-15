const oracledb = require('oracledb')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const config = {
  user: 'kerryhannigan',
  password: 'uTLjoZfiwsfE7CAK863rNKpl',
  connectString: 'oracle.cise.ufl.edu:1521/orcl',
}

async function selectAllStocks(req, res) {
  try {
    connection = await oracledb.getConnection(config)

    console.log('connected to database')
    // run query to get all employees
    result = await connection.execute(
      `SELECT * FROM KERRYHANNIGAN.STOCK ORDER BY CAPLEVEL`
    )
  } catch (err) {
    //send error message
    return res.send(err.message)
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close()
        console.log('close connection success')
      } catch (err) {
        console.error(err.message)
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows')
    } else {
      //send all employees
      return res.send(result.rows)
    }
  }
}

//get /employess
app.get('/Stocks', function (req, res) {
  selectAllStocks(req, res)
})

app.listen(5000, () => {
  console.log('Server Running on port 5000')
})