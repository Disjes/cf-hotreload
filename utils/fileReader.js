const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

/**
 * Read a file from Google Cloud Storage.
 *
 * @param {string} bucketName - Name of the GCS bucket.
 * @param {string} fileName - Name of the file to be read.
 * @returns {Promise<string>} - The content of the file.
 * @throws {Error} If reading the file fails.
 */
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

module.exports = {
    readFileFromGCS
};