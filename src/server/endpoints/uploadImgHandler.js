'use strict';

const {getSignedUrlByAwsSdk} = require('../modules/file-to-s3-upload');

function uploadImg(req, res) {
  const {fileName, fileType} = req.query;
  const task = 'putObject';
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read',
  };

  getSignedUrlByAwsSdk(task, s3Params, (data) => {
    res.json({
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    });
  })();
}

module.exports = {uploadImg: uploadImg};
