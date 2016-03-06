var express = require('express')
var path            = require('path'); // модуль для парсинга пути
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/tapp';
var dbObject = null;
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  downloadDB(db, function() {
      db.close();
  });
});

var downloadDB = function(db, callback) {
   var cursor =db.collection('competition').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
          console.log("doc != null");
          dbObject = doc.db;
          //console.log(JSON.stringify(doc.db));
         //console.dir(doc);
      } else {
          console.log("doc == null");
         callback();
      }
   });
};
//192/168/103/1
//app.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
//app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
//app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
//app.use(express.methodOverride()); // поддержка put и delete
//app.use(app.router); // модуль для простого задания обработчиков путей
//app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)
app.use(express.static('public'));

app.get('/api', function (req, res) {
    res.send('API is running');
});
app.get('/Con', function (req, res) {
    console.log("Server Reached");
    res.send('Server Reached');
});
app.get('/getTeams', function (req, res) {
    res.json(dbObject.teams);
    console.log(JSON.stringify(dbObject.teams));
    console.log(dbObject.teams.length);
});
app.get('/getStages', function (req, res) {
    res.json(dbObject.stages);
    console.log(JSON.stringify(dbObject.stages));
    console.log(dbObject.stages.length);
});
// app.get('/', function (req, res) {
//     res.sendFile('index.html');
// });

// app.get('*', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});

//GET IP_ADRESS
var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});
