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

app.get('/getMenu/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT Description From Products WHERE Editie_ID = "' + req.params.Editie + '"',
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
app.get('/getProductSales/:Editie/:Product', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT W.FirstName, SUM(D.Quantity) as Aantal FROM Waiters W INNER JOIN Orders O ON W.ID = O.Waiter_ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.ID = "' + req.params.Product + '" AND Editie_ID = "' + req.params.Editie + '" GROUP BY W.FirstName',
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
app.get('/getMenu/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT Description From Products WHERE Editie_ID = "' + req.params.Editie + '"',
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
//Procenten

app.get('/TotaalFamillies', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(F.Name) as Aantal From Families F',
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
app.get('/FVoorgerechten', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT(F.Name)) as Aantal FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Voorgerecht"',
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
app.get('/FHoofdgerechten', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT(F.Name)) as Aantal FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Hoofdgerecht"',
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
app.get('/FDessert', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT(F.Name)) as Aantal FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Dessert"',
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
app.get('/FVoorEnHoofd', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT(F.Name)) as Aantal FROM Families F WHERE F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Voorgerecht") AND F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Hoofdgerecht")',
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
app.get('/FHoofdEnDessert', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT(F.Name)) as Aantal FROM Families F WHERE F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Hoofdgerecht") AND F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Dessert")',
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
app.get('/FVoorEnDessert', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT(F.Name)) as Aantal FROM Families F WHERE F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Voorgerecht") AND F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Dessert")',
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
app.get('/FVoorEnHoofdEnDessert', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT(F.Name)) as Aantal FROM Families F WHERE F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Voorgerecht") AND F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Hoofdgerecht") AND F.Name IN( SELECT F.Name FROM Families F INNER JOIN Orders O ON O.Family_ID=F.ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.newCategory = "Dessert") ',
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
//DrukteStatistiek
app.get('/DruktePerTimeStamp/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT E.TimeStamp, Count(O.ID) AS CountOfID FROM EditieTimeStamps E, Orders O WHERE (((O.TimeDB<=E.TimeStamp)=True) AND ((O.Payed_TimeStamp>E.TimeStamp)=True)) AND E.Editie = "' + req.params.Editie + '" AND O.Editie_ID = "' + req.params.Editie + '" GROUP BY E.TimeStamp, O.TimeDB<= E.TimeStamp, O.Payed_TimeStamp>E.TimeStamp ',
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
//STATISTIEK PAGINA
app.get('/GetAllOrderTimeStamp/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.TimeDB, O.Payed_TimeStamp FROM Orders O WHERE Editie_ID = "' + req.params.Editie + '"',
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

app.get('/ClearTimeStamps/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('DELETE FROM `EditieTimeStamps` WHERE `Editie` = "' + req.params.Editie + '"',
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
app.get('/UpdateTimeStamps/:Editie/:TS', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('INSERT INTO `EditieTimeStamps`(`Editie`, `TimeStamp`) VALUES ("' + req.params.Editie + '","' + req.params.TS + '")',
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
app.get('/GetEdities', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT E.Name as EditieName, E.ID, C.Name FROM Edities E INNER JOIN Company C ON E.Company_ID = C.ID',
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
app.get('/FamiliesInZaalAtTijd/:Tijd/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT F.ID) AS AantalFamilies FROM Families F INNER JOIN Orders O ON O.Family_ID = F.ID WHERE (O.Payed_TimeStamp >= "' + req.params.Tijd + '") AND (O.TimeDB <= "' + req.params.Tijd + '") AND O.Editie_ID = "' + req.params.Editie + '"',
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
app.get('/GetUnpayedFamilies/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT F.Name FROM Orders O INNER JOIN Families F ON O.Family_ID = F.ID WHERE O.Payed = 0 AND O.Editie_ID = "' + req.params.Editie + '" GROUP BY F.Name',
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
app.get('/LastTenOrders/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.ID as Order_ID, COALESCE(W.FirstName, "Geen Ober") as Ober, F.Name, O.Table_ID , TimeWeb, TimeWeb, (TimeDB-TimeWeb)as Delay_S FROM Orders O LEFT OUTER JOIN Waiters W ON W.ID = O.Waiter_ID INNER JOIN Families F ON F.ID=O.Family_ID WHERE O.Editie_ID = "' + req.params.Editie + '" ORDER BY O.ID DESC limit 0,20',
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
app.get('/BestelTotalenFood/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT P.Description, SUM(D.Quantity) as Hoeveelheid FROM OrderDetails D INNER JOIN Products P ON D.ProductID = P.ID INNER JOIN Orders O ON O.ID = D.OrderID WHERE P.Category = "Keuken" OR P.Category = "Dessert" AND O.Editie_ID = "' + req.params.Editie + '" GROUP BY P.Description ',
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
app.get('/BestelTotalenBar/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT P.Description, SUM(D.Quantity) as Hoeveelheid FROM OrderDetails D INNER JOIN Products P ON D.ProductID = P.ID INNER JOIN Orders O ON O.ID = D.OrderID WHERE P.Category = "Bar" AND O.Editie_ID = "' + req.params.Editie + '" GROUP BY P.Description',
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
app.get('/Omzet/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT SUM(D.Quantity * P.Price) as Omzet FROM OrderDetails D INNER JOIN Products P ON D.ProductID = P.ID INNER JOIN Orders O ON O.ID = D.OrderID WHERE O.Editie_ID = "' + req.params.Editie + '"',
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
app.get('/UnpayedFamilies/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(DISTINCT F.Name) AS Unpayed_Capacity FROM Families F INNER JOIN Orders O ON O.Family_ID = F.ID WHERE O.Payed = 0 AND O.Editie_ID = "' + req.params.Editie + '"',
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
app.get('/UnpayedPeople/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT SUM(F.Capacity) AS PeopleInZaal FROM Families F WHERE F.ID IN( SELECT DISTINCT F.ID FROM Families F INNER JOIN Orders O ON O.Family_ID = F.ID WHERE O.Payed = 0 AND O.Editie_ID = "' + req.params.Editie + '") ',
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
app.get('/TopWaiters/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT W.FirstName, COUNT(O.ID) AS Orders, SUM(D.Quantity * P.Price) AS Omzet FROM Waiters W INNER JOIN Orders O ON W.ID = O.Waiter_ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE O.Editie_ID = "' + req.params.Editie + '" GROUP BY W.FirstName ORDER BY Omzet DESC ',
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
app.get('/KeukenOrdersWaiters/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT W.FirstName, COUNT(O.ID) AS Orders FROM Waiters W INNER JOIN Orders O ON W.ID = O.Waiter_ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.Category = "Keuken" OR P.Category = "Dessert" AND O.Editie_ID = "' + req.params.Editie + '" GROUP BY W.FirstName ORDER BY SUM(D.Quantity * P.Price) DESC',
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
app.get('/BarOrdersWaiters/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT W.FirstName, COUNT(O.ID) AS Orders FROM Waiters W INNER JOIN Orders O ON W.ID = O.Waiter_ID INNER JOIN OrderDetails D ON D.OrderID = O.ID INNER JOIN Products P ON P.ID = D.ProductID WHERE P.Category = "Bar" AND O.Editie_ID = "' + req.params.Editie + '" GROUP BY W.FirstName ORDER BY SUM(D.Quantity * P.Price) DESC',
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
app.get('/CashVSKaart/:Editie', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.Pay_Way, SUM(D.Quantity*P.Price) as Quan FROM Orders O INNER JOIN OrderDetails D ON O.ID = D.OrderID INNER JOIN Products P ON P.ID = D.ProductID WHERE O.Editie_ID = "' + req.params.Editie + '" GROUP BY O.Pay_Way ',
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
// app.get('/FamByTable/:Tid', function(req, res){ //GET method to access DB and return results in JSON
//   connection.query('SELECT Distinct(Name) FROM Families F INNER JOIN Orders O ON F.ID = O.Family_ID WHERE O.Table_ID = "' + req.params.Tid + '"',
//   function(err, rows, fields){
//     if(err) throw err;
//     var data = [];
//     for(i=0;i<rows.length;i++){
//       data.push(rows[i]);
//     }
//     console.log(JSON.stringify(data));
//     res.end(JSON.stringify(data));
//   });
// });
app.get('/AllFamiliesForKassa', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT F.Name FROM Families F LEFT OUTER JOIN Orders O ON O.Family_ID = F.ID GROUP BY F.Name',
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
app.get('/AllFamilies', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT F.Name, coalesce(O.Table_ID, "") as Tafel_ID FROM Families F LEFT OUTER JOIN Orders O ON O.Family_ID = F.ID GROUP BY F.Name, O.Table_ID',
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
app.get('/BarIndex/:f', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT COUNT(O.ID) as BarOrderIndex, F.Capacity FROM Orders O INNER JOIN OrderDetails D on O.ID = D.OrderID INNER JOIN Products P on D.ProductID = P.ID INNER JOIN Families F ON F.ID = O.Family_ID WHERE F.Name = "' + req.params.f + '"  AND P.Category = "Bar" ',
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
  connection.query('SELECT ID FROM Families WHERE Name = "' + req.params.name + '"',
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
app.get('/GetProductTotQuan', function(req, res){ //GET method to access DB and return results in JSON
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
  app.get('/PayOrder/:id/:method/:PayTime', function(req, res){ //GET method to access DB and return results in JSON
    connection.query('UPDATE `Orders` SET `Payed`="1", `Pay_Way`  = "'+ req.params.method + '", `Payed_TimeStamp` = "'+ req.params.PayTime + '" WHERE ID= "' + req.params.id + '"',
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
  connection.query('SELECT SUM(d.Quantity) as Quantity, p.Description, (p.Price*SUM(d.Quantity)) as Totaal FROM Products p INNER JOIN OrderDetails d ON p.ID = d.ProductID INNER JOIN Orders o ON o.ID = d.OrderID INNER JOIN Families F ON F.ID = o.Family_ID WHERE F.Name = "' + req.params.name + '" AND o.Payed="0" GROUP BY p.Description ORDER BY p.indexKassaExcel',
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
  connection.query('SELECT O.ID, O.Table_ID, SUM(D.Quantity*P.Price) as OrderTotal FROM Orders O INNER JOIN OrderDetails D ON O.ID = D.OrderID INNER JOIN Products P ON P.ID = D.ProductID INNER JOIN Families F ON F.ID = O.Family_ID WHERE  F.Name = "' + req.params.name + '" AND O.Payed="0" GROUP BY O.ID',
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