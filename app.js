const Crawler = require('./crawler');
const js2xmlparser = require("js2xmlparser");
const express = require('express');


var app = express();
app.get('/home',(request,response)=>{
  response.send('Hello')
});

app.get('/:url/:level/:outputType',(request,response)=>{


  // var obj1 = { a: 1, b: 2 };
  // var obj2 = { c: 3, d: 4 };
  // // ---------- ES5 ----------
  // //var obj3 = Object.assign(obj1, obj2);
  // // ---------- ES6 ----------
  // var obj3 = { ...obj1, ...obj2 };

  // console.log(JSON.stringify(obj3));








  let url = 'http://'+request.params.url || 'https://wiprodigital.com';
  let outputType = request.params.outputType || 'xml';
  let  level =  request.params.level || 1;

  console.log('url ',url,' outputType ',outputType,' level ',level);

  

  const crawler =  new Crawler(url,level);
  

  
  crawler.start((resources) => {
    const array = [...resources];
  
    console.log(`${url} has ${array.length} links.`);
  
    console.log();
  
    if (outputType == 'xml') {
      response.type('application.xml')
      response.send(js2xmlparser.parse("sitemap", array));
    } else {
      response.json(array);
    }
  });

 

});

app.listen(3000,()=>{
  console.log('Server started at 3000');
})



module.exports = app;

