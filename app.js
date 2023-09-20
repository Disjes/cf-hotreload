const functions = require('firebase-functions');
const { readFileFromGCS } = require('./utils/fileReader');

exports.hotReloadFunction = functions.https.onRequest(async (req, res) => {
    const bucketName = 'gdoc-md-sync-391822.appspot.com';
    const fileName = 'hotReloadModule.js';

    try {
        const content = await readFileFromGCS(bucketName, fileName);
        res.send(content);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Error reading file.');
    }
});