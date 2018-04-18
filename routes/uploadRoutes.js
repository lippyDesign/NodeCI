const AWS = require('aws-sdk');
const uuid = require('uuid/v1');

const { accessKeyId, secretAccessKey } = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({ accessKeyId, secretAccessKey });

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    // generate key
    const Key = `${req.user.id}/${uuid()}.jpeg`;
    s3.getSignedUrl('putObject', { Bucket: 'vlad-blog-bucket-12345', ContentType: 'image/jpeg', Key }, (err, url) => {
      res.send({ Key, url });
    });
  });
}