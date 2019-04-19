# Lab 9 Documentation

** Abenezer Monjor
** John Schonebaum 
** Isaac Yoakum
** Francisco Montanez
** Database: jafi


*Log in
To log in there are 4 user buttons that could be clicked. Until they are clicked no other function can be used. When you make a sale or void a transaction you must log in again. And to log out click void.

*Register buttons

GET/buttons
http://localhost:1337/buttons/

```javascript
[{"buttonID":1,
"label":"hotdog",
"left":"10",
"top":70,"width":100},
{"buttonID":2,
"label":"humburger",
"left":"110",
"top":70,
"width":100},
{"buttonID":3,
"label":"banana",
"left":"210",
"top":70,
"width":100},
{"buttonID":4,
"label":"milkduds",
"left":"10",
"top":120,
"width":100}]
```
*VOID and SALE
GET/users
http://localhost:1337/users

```javascript
[{"buttonID":1,
"left":"10",
"top":410,
"width":100,
"label":"VOID"},
{"buttonID":2,
"left":"110",    
"top":410,
"width":100,
"label":"SALE"}]
```

the VOID button sends a request to truncate table theCart
the SALE button calls the MySQL procedure sale(user), which records the stores the current sale
in transactionSummary

*Delete
Delete items with selected id. eg. id =1
http://localhost:1337/delete?id=1


*Cart
GET/ cart
http://localhost:1337/cart

Gets information from table theCart


```javascript
[{"itemID":1,
"quantity":2,
"itemTotal":11.98,
"time":"2019-04-19T19:42:19.000Z",
"item":"hotdog"},
{"itemID":4,
"quantity":2,
"itemTotal":3,
"time":"2019-04-19T19:42:18.000Z",
"item":"milkduds"}]

```

*Reciept
GET/receipt
http://localhost:1337/receipt

gets newest item from transactionSummary table

```javascript
[
{
"transactionID": 54,
"startTime": "2019-04-19T19:30:54.000Z",
"stopTime": "2019-04-19T19:31:08.000Z",
"duration": "00:00:14",
"user": "Isaac",
"total": null
}
]
```

*Click
add items with selected id. eg. id = 1 which is hotdog.
http://localhost:1337/click?id=1

*Total
display total of items in cart
http://localhost:1337/total

```javascript
[
{
"Total": 25.36
}
]
```


