const https = require('https');
const fs = require("fs");
const express = require("express");
url = 'https://www.luogu.com.cn/paste/'
var JSONcode;
decodeURI = ''
const app= express();

app.get('/api/luogu/page', (req, res)=>{
    url = 'https://www.luogu.com.cn/' + req.query.url;
    keycode = req.query.keycode;
    // JSONtt = ''
    console.log(url);
    https.get(url, (ress) => {
      let data = '';
      
  
      ress.on('data', (chunk) => {
        data += chunk;
      });
    
    
      ress.on('end', () => {
        // console.log(data)
        decodeURI = data.substring(data.search('decodeURIComponent') + 20, data.search('feConfigVersion') - 12)
        console.log(data.search('Redirecting to /auth/login'))
        var needLogin = data.search('Redirecting to /auth/login')
        if (needLogin != -1) {
          res.send({'needLogin' : true})
        } else {
          console.log(decodeURIComponent((decodeURI)))
        // console.log(unescape(decodeURI));
        JSONcode = JSON.parse(decodeURIComponent((decodeURI)));
        // console.log(JSONcode.currentData.paste.user);
        // console.log(keycode);
        // console.log(JSONcode.currentData.paste.data);
        JSONcode['needLogin'] = false
         res.send(JSONcode);
        // else res.send({'isOK' : false});
        }
        
      });
    }).on('error', (err) => {
      console.log('Error: ', err.message);
    });
    
    
    
  });
app.listen(8084, ()=>{
  console.log('Server is running at http://localhost:8084')
})
