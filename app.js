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
//ADMIN PAGINA

app.get('/ReprintStatusUpdateBar/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE `Orders` SET `BarPrint`="0" WHERE `ID`="' + req.params.id + '" ',
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
app.get('/ReprintStatusUpdateKeuken/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE `Orders` SET `KeukenPrint`="0" WHERE `ID`="' + req.params.id + '" ',
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
//BREF
app.get('/GetFamID/:name', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT ID FROM Families WHERE Name LIKE "' + req.params.name + '"',
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

app.get('/DetailsOrder/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT P.Description, D.Quantity FROM Orders O INNER JOIN OrderDetails D ON O.ID=D.OrderID INNER JOIN Products P ON D.ProductID=P.ID WHERE O.ID LIKE "' + req.params.id + '"',
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

app.get('/LastTenOrders', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, O.Waiter_ID, TimeWeb FROM Orders O ORDER BY O.ID DESC limit 0,10',
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

app.get('/searchFamillie/:name', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT Name FROM Families WHERE Name LIKE "' + req.params.name + '"',
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

app.get('/newFam/:name/:capacity', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('INSERT INTO Families(Name, Capacity) VALUES ("' + req.params.name + '", "' + req.params.capacity + '") ',
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
  connection.query('SELECT Description, ID FROM Products WHERE Category LIKE "Bar"',
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
  connection.query('SELECT Description, ID FROM Products WHERE Category LIKE "Keuken"',
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
  connection.query('SELECT Description, ID FROM Products WHERE Category LIKE "Dessert" OR Category LIKE "Bar"',
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
  app.get('/PayOrder/:id/:method', function(req, res){ //GET method to access DB and return results in JSON
    connection.query('UPDATE `Orders` SET `Payed`="1", `Pay_Way` = "'+ req.params.method + '" WHERE ID= "' + req.params.id + '"',
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


app.get('/AllTotal/:name', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT SUM(P.Price * D.Quantity) as Totaal, F.Name FROM Products P INNER JOIN OrderDetails D ON P.ID = D.ProductID INNER JOIN Orders O ON D.OrderID = O.ID INNER JOIN Families F ON F.ID = O.Family_ID WHERE F.Name = "' + req.params.name + '" AND O.Payed="0"',
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

app.get('/Reciept/:name', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT  SUM(d.Quantity) as Quantity, p.Description, (p.Price*SUM(d.Quantity)) as Totaal FROM Products p INNER JOIN OrderDetails d ON p.ID = d.ProductID  INNER JOIN  Orders o ON o.ID = d.OrderID INNER JOIN Families F ON F.ID = o.Family_ID WHERE  F.Name = "' + req.params.name + '" AND o.Payed="0" GROUP BY p.Description',
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

app.get('/OrderLines/:name', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, D.Quantity, P.Description, P.Price, (D.Quantity * P.Price) as Total FROM Orders O INNER JOIN OrderDetails D ON O.ID = D.OrderID INNER JOIN Products P ON D.ProductID = P.ID INNER JOIN Families F ON F.ID = O.Family_ID WHERE F.Name =  "' + req.params.name + '"AND O.Payed="0"',
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

app.get('/OrderAndTotal/:name', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, SUM(D.Quantity*P.Price) as OrderTotal FROM Orders O INNER JOIN OrderDetails D ON O.ID = D.OrderID INNER JOIN Products P ON P.ID = D.ProductID INNER JOIN Families F ON F.ID = O.Family_ID WHERE  F.Name = "' + req.params.name + '" AND O.Payed="0" GROUP BY O.ID',
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

app.get('/NewOrder/:FamID', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(O.ID) AS Count, F.Capacity FROM Orders O INNER JOIN Families F ON O.Family_ID = F.ID WHERE O.Family_ID = "'+ req.params.FamID +'"',
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

app.get('/NewOrder/:WaiterID/:FamilieID/:TableID/:TimeWeb/:Opmerking', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('INSERT INTO Orders(Waiter_ID,Family_ID,Table_ID,TimeWeb,Opmerking) VALUES ("'+ req.params.WaiterID +'","'+ req.params.FamilieID +'","'+ req.params.TableID +'","'+ req.params.TimeWeb + '","'+ req.params.Opmerking +'")',
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
app.get('/NewPrintResetAfterLineAdd/:OrderID', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE `Orders` SET `KeukenPrint`=0,`BarPrint`=0,`DessertPrint`= 0 WHERE Orders.ID = "'+ req.params.OrderID +'")',
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
/*GET THE ORDER*/
app.get('/DessertMinOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT MIN(ID) as id FROM Orders WHERE DessertPrint = 0 ',
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

app.get('/BarMinOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT MIN(ID) as id FROM Orders WHERE BarPrint = 0 ',
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

app.get('/KeukenMinOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT MIN(ID) as id FROM Orders WHERE KeukenPrint = 0 ',
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
app.get('/KinderMenuQuan/:name', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT P.Description, SUM(D.Quantity) as Quantity FROM OrderDetails D INNER JOIN Orders O ON O.ID = D.OrderID INNER JOIN Products P ON P.ID = D.ProductID INNER JOIN Families F ON F.ID = O.Family_ID WHERE F.Name = "'+ req.params.name +'" AND P.Description = "Kindermenu" GROUP BY P.Description ',
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
/*
app.get('/DessertOrderID', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID FROM Orders O WHERE O.ID IN (SELECT MIN(o.ID) from Orders o WHERE DessertPrint=0)',
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
app.get('/BarOrderID', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID FROM Orders O WHERE O.ID IN (SELECT MIN(o.ID) from Orders o WHERE BarPrint=0)',
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
app.get('/KeukenOrderID', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID FROM Orders O WHERE O.ID IN (SELECT MIN(o.ID) from Orders o WHERE KeukenPrint=0)',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});*/

app.get('/DessertOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, W.FirstName AS WaiterName,O.Opmerking, F.Name AS FamilyName, O.TimeWeb ,O.Table_ID, P.Description, D.Quantity FROM Orders O JOIN OrderDetails D ON O.ID=D.OrderID JOIN Products P ON D.ProductID = P.ID JOIN Families F ON F.ID = O.Family_ID JOIN Waiters W ON W.ID = O.Waiter_ID WHERE P.Category = "Dessert" AND O.ID IN ( SELECT MIN(ID) FROM Orders WHERE DessertPrint="0" )',
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

app.get('/BarOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, W.FirstName AS WaiterName,O.Opmerking, F.Name AS FamilyName, O.TimeWeb ,O.Table_ID, P.Description, D.Quantity FROM Orders O JOIN OrderDetails D ON O.ID=D.OrderID JOIN Products P ON D.ProductID = P.ID JOIN Families F ON F.ID = O.Family_ID JOIN Waiters W ON W.ID = O.Waiter_ID WHERE P.Category = "Bar" AND O.ID IN ( SELECT MIN(ID) FROM Orders WHERE BarPrint="0" )',
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

app.get('/KeukenOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID, W.FirstName AS WaiterName, F.Name AS FamilyName,O.Opmerking, O.TimeWeb ,O.Table_ID, P.Description, D.Quantity FROM Orders O JOIN OrderDetails D ON O.ID=D.OrderID JOIN Products P ON D.ProductID = P.ID JOIN Families F ON F.ID = O.Family_ID JOIN Waiters W ON W.ID = O.Waiter_ID WHERE P.Category = "Keuken" AND O.ID IN ( SELECT MIN(ID) FROM Orders WHERE KeukenPrint="0" )',
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
app.get('/DessertOrderPrinted/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE Orders SET DessertPrint= "1" WHERE ID = "'+ req.params.id + '"',
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


app.get('/BarOrderPrinted/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE Orders SET BarPrint= "1" WHERE ID = "'+ req.params.id + '"',
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

app.get('/KeukenOrderPrinted/:id', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE Orders SET KeukenPrint= "1" WHERE ID = "'+ req.params.id + '"',
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