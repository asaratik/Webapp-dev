var fs = require('fs');

var data = fs.readFileSync('index.html');


var data = fs.readFileSync('index.html',function(err,data){
  if(err) return console.error(err);
  console.log(data.toString());
});

console.log(data.toString());

console.log('The End');
