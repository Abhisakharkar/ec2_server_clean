const Magento2 = require('node-magento2');

//instantiate the client object
const options = {
  authentication: {
    integration: { //from the integrations section in the magento2 backend
      consumer_key: 'tt9cprho11tnhyffr6edysornigrn90i',
      consumer_secret: 'i1a1qu9xha64h1tsvldiv6kr4rrfipse',       //localhost
      access_token: 'uq37eihfo9crn7j0u158dj4dhx7k8lnl',
      access_token_secret: 'e76x7h7xkfduomhbpww4e9srackyqfdb'
    }
  }
}
const mageClient = new Magento2('http://localhost/magento/index.php', options)
mageClient.init();
module.exports=mageClient;
