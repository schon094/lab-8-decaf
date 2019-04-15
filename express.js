var express = require('express'),
  mysql = require('mysql'),
  credentials = require('./credentials.json'),
  app = express(),
  port = process.env.PORT || 1337;

//setup database credentials
credentials.host = 'ids.morris.umn.edu';

// setup the connection
var connection = mysql.createConnection(credentials);

// attempts to connect to database, returns
// error if not able to connect
connection.connect(function(err) {
  if (err) {
    console.log(error + " Hey you, I could not connect to the database.")
  }
});

// not sure what this is for
app.use(express.static(__dirname + '/public'));

// attempts to retrieve the buttons
// returns error if unable to
app.get("/buttons", function(req, res) {
  var sql = 'SELECT * FROM jafi.theButtons;';
  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an error getting the buttons:");
        console.log(err);
      }
      res.send(rows);
    }
  })(res));
});

// attempts to retrieve data from the cart
// returns an error if unable to
app.get("/cart", function(req, res) {
  var sql = 'select jafi.theCart.*,jafi.theInventory.item from jafi.theCart join jafi.theInventory on jafi.theInventory.itemID =jafi.theCart.itemID;';

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an error getting the cart:");
        console.log(err);
      }
      res.send(rows);
    }
  })(res));
});

app.get("/users", function(req, res) {
  var sql = 'select * from jafi.userButtons;';

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an error getting the users:");
        console.log(err);
      }
      res.send(rows);
    }
  })(res));
});

app.get("/user", function(req, res) {
  var id = req.param('id');
  var name = req.param('name');
  console.log(name);

  if (id == 1) {
    var sql = "truncate jafi.theCart";
    console.log("TRUNCATEEEEE");
  } else if (id == 2) {
    var sql = "call jafi.sale('" + name + "')";
    console.log("@@");
  }

  console.log(id);

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("void error:");
        console.log(err);
      }
      res.send(rows); // Let the upstream guy know how it went
    }
  })(res));

});

app.get("/click", function(req, res) {
  var id = req.param('id');

  var sql = "call jafi.addToCart(" + id + ")";
  /**
  var hotdogCounter = 0;
  var burgerCounter = 0;
  var bananaCounter = 0;
  var milkdudCounter = 0;
  var startTime = Date();

  switch (id) {
    case 1:
      if (hotdogCounter = 0) {
        hotdogCounter++;

        var sql = "INSERT INTO jafi.theCart from SELECT theInventory.itemID, " + hotdogCounter + ", ";

      }

  }


  if (id == 1) {
    var sql = "insert into jafi.users values('null','Isaac')";
    console.log("Attempting sql ->" + sql + "<-");
  } else if (id == 2) {
    var sql = "insert into jafi.cart values('null','John')";
    console.log("Attempting sql ->" + sql + "<-");
  } else if (id == 3) {
    var sql = "insert into jafi.cart values('null','Abe')";
    console.log("Attempting sql ->" + sql + "<-");
  } else if (id == 4) {
    var sql = "insert into jafi.cart values('null','Fransisco')";
    console.log("Attempting sql ->" + sql + "<-");
  } else if (id == 5) {
    var sql = "truncate jafi.cart";
    console.log("Attempting sql ->" + sql + "<-");
  }

  **/

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an insertion error:");
        console.log(err);
      }
      res.send(err); // Let the upstream guy know how it went
    }
  })(res));
});

app.get("/delete", function(req, res) {
  var id = req.param('id');
 console.log(id);
  var sql = "call jafi.removeItem(" + id + ");";
  console.log("Attempting sql ->" + sql + "<-");

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an deletion error:");
        console.log(err);
      }
      res.send(err); // Let the upstream guy know how it went
    }
  })(res));
});

app.get("/total", function(req, res) {
  var sql = "select sum(itemTotal) from jafi.theCart;"
  console.log("Attempting sql ->" + sql + "<-");

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("Total error:");
        console.log(err);
      }
      res.send(rows); // Let the upstream guy know how it went
    }
  })(res));
});

// Your other API handlers go here!

app.listen(port);
