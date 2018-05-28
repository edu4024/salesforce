const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const serveStatic = require('serve-static');
const jsforce = require("jsforce");
const oauthserver = require('oauth2-server');

const port= 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(serveStatic('dist/task', {'index': ['index.html']}));

app.use(session({secret: 'S3CRE7', resave: true, saveUninitialized: true}));

app.listen(port,  ()=> {
   console.log('API app started '+ port);
 });
/*
const conn = new jsforce.Connection({
    clientId: '3MVG9d8..z.hDcPJm3OXl4hnDqlSd0VfluRNHY1IJZX0vb6banBuPEupGFVGpGnGcsv2D0FbNtq2GdN9RPHFr',
    clientSecret: '476599873065627464',
    redirectUri: 'http://localhost:8080/oauth2/_callback'

});

conn.login('yan.fa@gmail.com', 'barakuda21KsZ578THqMs6EjRB9q4spg53', function(err, userInfo) {
  if (err) { return console.error(err); }

  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
});


var conn = new jsforce.Connection({
  instanceUrl : 'https://ap5.salesforce.com',
  accessToken : '00D7F000007BxGg!ARUAQKjZQ48SoojuroVw7pLRD_3SL6g99mDRe2kCdnswRsLwVazyueKhzQTetfiWXnwpBgOIuqdXZD8ifsYDKr1Wj3Ll.J9P'
});
*/

const oauth2 = new jsforce.OAuth2({
  clientId: '3MVG9d8..z.hDcPJm3OXl4hnDqlSd0VfluRNHY1IJZX0vb6banBuPEupGFVGpGnGcsv2D0FbNtq2GdN9RPHFr',
  clientSecret: '476599873065627464',
  redirectUri: 'http://localhost:8080/oauth2/_callback'
});

app.get('/oauth2/auth', (req, res)=>{
  res.redirect(oauth2.getAuthorizationUrl());
});

app.get('/oauth2/_callback', (req, res)=>{
  const conn = new jsforce.Connection({ oauth2 : oauth2 });
  const code = req.param('code');
  conn.authorize(code, (err, userInfo)=>{
    if (err) { return console.error(err); }


    console.log(conn.accessToken);
    console.log(conn.refreshToken);
    console.log(conn.instanceUrl);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);

        req.session.accessToken = conn.accessToken;
        req.session.instanceUrl = conn.instanceUrl;
        req.session.refreshToken = conn.refreshToken;

        res.redirect('http://localhost:8080');
  });
});

app.get('/contacts', (req,res)=>{
  if(!req.session.accessToken || !req.session.instanceUrl){
    res.redirect('/');
  }
  const q= 'SELECT Id, FirstName, LastName FROM contact';
  const conn = new jsforce.Connection ({
      oauth2: {oauth2},
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
 });
   const records = [];
     const query = conn.query (q)
        .on ("record",  (record)=>{
          records.push(record);
        })
        .on ("end",  ()=> {
          console.log ("total Size: "+ query.totalSize);
          res.send(records);
        })
        .on (" error ",  (err)=> {
          console.error (err);
        });
});

app.get('/contacts/:id', (req, res)=>{
  const conn = new jsforce.Connection ({
        oauth2: {oauth2},
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
  });
  conn.sobject("contact")
    .findOne(
          {
              'Id':{$like:req.params.Id},

          },
          {
             FirstName:1, LastName:1, Email:1, Phone:1, Salutation:1, CleanStatus:1,
             MailingStreet:1, Fax:1, Title:1, Department:1, LeadSource:1, Birthdate:1
           },
          (err, rec)=>{
            if (err){ return console.log(err);}
            res.status(201)
            .send(rec);
          //  console.log(rec);
          }
      );

});
