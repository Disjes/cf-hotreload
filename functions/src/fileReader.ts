import { Storage } from '@google-cloud/storage';

/**
 * Read a file from Google Cloud Storage.
 *
 * @param bucketName - Name of the GCS bucket.
 * @param fileName - Name of the file to be read.
 * @returns The content of the file.
 * @throws If reading the file fails.
 */
async function readFileFromGCS(bucketName: string, fileName: string, projectId: string): Promise<string> {
    const storage = new Storage({ projectId: projectId });
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    let content = '';
    return new Promise<string>((resolve, reject) => {
        file.createReadStream()
            .on('data', (chunk: Buffer) => {
                content += chunk.toString();
            })
            .on('end', () => {
                resolve(content);
            })
            .on('error', (error: Error) => {
                reject(error);
            });
    });
}

export {
    readFileFromGCS
};