const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

exports.readFileFromGCS = functions.https.onRequest(async (req, res) => {
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

async function readFileFromGCS(bucketName, fileName) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    let content = '';
    return new Promise((resolve, reject) => {
        file.createReadStream()
            .on('data', chunk => {
                content += chunk;
            })
            .on('end', () => {
                resolve(content);
            })
            .on('error', error => {
                reject(error);
            });
    });
}