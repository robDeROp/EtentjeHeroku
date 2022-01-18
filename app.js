const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const { response } = require('express');

const app = express();

app.use(cors());

mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'ID362979_Etentje.db.webhosting.be',
  user: 'ID362979_Etentje',
  password: 'Sp15021!',
  database: 'ID362979_Etentje'
})

app.get('/searchWaiter/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT FirstName FROM Waiters WHERE ID LIKE "' + req.params.id + '"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/searchFamillie/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT Name FROM Families WHERE ID LIKE "' + req.params.id + '"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});
app.get('/BestelFormDrank', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT Description, ID FROM Products WHERE Category LIKE "Drank"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});
app.get('/BestelFormGerechten', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT Description, ID FROM Products WHERE Category LIKE "Voorgerecht" OR Category LIKE "Hoofdgerecht" OR Category LIKE "Drank"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/BestelFormDessert', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT Description, ID FROM Products WHERE Category LIKE "Dessert" OR Category LIKE "Drank"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


app.get('/LastOrder/:Wid', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT MAX(ID) as id FROM Orders WHERE Waiter_ID= "' + req.params.Wid + '"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

    //KASSA PAGINA
  app.get('/PayOrder/:id', function(req, res){ //GET method to access DB and return results in JSON
    connection.query('UPDATE `Orders` SET `Payed`="1" WHERE ID= "' + req.params.id + '"',
    function(err, rows, fields){
      if(err) throw err;
      var data = [];
      for(i=0;i<rows.length;i++){
        data.push(rows[i]);
      }
      console.log(JSON.stringify(data));
      res.end(JSON.stringify(data));
    });
  });


app.get('/AllTotal/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT SUM(P.Price * D.Quantity) as Totaal, F.Name FROM Products P INNER JOIN OrderDetails D ON P.ID = D.ProductID INNER JOIN Orders O ON D.OrderID = O.ID INNER JOIN Families F ON F.ID = O.Family_ID WHERE F.ID = "' + req.params.id + '" AND O.Payed="0"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/Reciept/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT  SUM(d.Quantity) as Quantity, p.Description, (p.Price*SUM(d.Quantity)) as Totaal FROM Products p INNER JOIN OrderDetails d ON p.ID = d.ProductID  INNER JOIN  Orders o ON o.ID = d.OrderID WHERE o.Family_ID = "' + req.params.id + '" AND o.Payed="0" GROUP BY p.Description',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/OrderLines/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, D.Quantity, P.Description, P.Price, (D.Quantity * P.Price) as Total FROM Orders O INNER JOIN OrderDetails D ON O.ID = D.OrderID INNER JOIN Products P ON D.ProductID = P.ID WHERE O.Family_ID =  "' + req.params.id + '"AND O.Payed="0"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/OrderAndTotal/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, SUM(D.Quantity*P.Price) as OrderTotal FROM Orders O INNER JOIN OrderDetails D ON O.ID = D.OrderID INNER JOIN Products P ON P.ID = D.ProductID WHERE O.Family_ID = "' + req.params.id + '" AND O.Payed="0" GROUP BY O.ID',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});


app.get('/NewOrder/:WaiterID/:FamilieID/:TableID/:TimeWeb', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('INSERT INTO Orders(Waiter_ID,Family_ID,Table_ID,TimeWeb) VALUES ("'+ req.params.WaiterID +'","'+ req.params.FamilieID +'","'+ req.params.TableID +'","'+ req.params.TimeWeb +'")',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/NewOrderLine/:OrderID/:ProdID/:ProdQuantity', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('INSERT INTO `OrderDetails`(`OrderID`, `ProductID`, `Quantity`) VALUES ("'+ req.params.OrderID + '","'+ req.params.ProdID +'","'+ req.params.ProdQuantity +'")',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

/*getting bar order*/
app.get('/BarOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, O.Family_ID, O.Table_ID, P.Description, D.Quantity FROM Orders O JOIN OrderDetails D ON O.ID=D.OrderID JOIN Products P ON D.ProductID = P.ID WHERE P.Category = "Drank" AND O.ID IN ( SELECT MIN(ID) FROM Orders WHERE BarPrint="0" )',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});
/*Change ORDER PRINT STATE*/

app.get('/BarOrderPrinted/:OrderID', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE Orders SET BarPrint= "1" WHERE ID = "'+req.params.OrderID+'"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/KeukenOrderPrinted/:OrderID', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE Orders SET KeukenPrint= "1" WHERE ID = "'+req.params.OrderID+'"',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});