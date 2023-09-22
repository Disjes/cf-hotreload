/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import { readFileFromGCS } from './fileReader';
import * as fs from 'fs';
import * as path from 'path';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const hotReloadFunction = onRequest(async (request, response) => {
    const bucketName: string = 'gdoc-md-sync-391822-sources';
    const fileName: string = 'hotReloadModule.js';
    const projectId: string = 'gdoc-md-sync-391822';

    try {
        const content: string = await readFileFromGCS(bucketName, fileName, projectId);
        
        //Install dependencies

        
        // Writing the code to a temp file
        const tempFilePath: string = path.join('/tmp', fileName);
        fs.writeFileSync(tempFilePath, content);

        const valueFromRequest: string = request.body.name;

        // Dynamically import the temp file module
        const moduleFromGCS = await import(tempFilePath);
        const result: any = moduleFromGCS.default(valueFromRequest);
        console.log(result);
        response.send(result);
    } catch (error) {
        console.error('Error reading file:', error);
        response.status(500).send('Error reading file.');
    }
});
