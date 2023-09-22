"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileFromGCS = void 0;
const storage_1 = require("@google-cloud/storage");
/**
 * Read a file from Google Cloud Storage.
 *
 * @param bucketName - Name of the GCS bucket.
 * @param fileName - Name of the file to be read.
 * @returns The content of the file.
 * @throws If reading the file fails.
 */
function readFileFromGCS(bucketName, fileName, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = new storage_1.Storage({ projectId: projectId });
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
        let content = '';
        return new Promise((resolve, reject) => {
            file.createReadStream()
                .on('data', (chunk) => {
                content += chunk.toString();
            })
                .on('end', () => {
                resolve(content);
            })
                .on('error', (error) => {
                reject(error);
            });
        });
    });
}
exports.readFileFromGCS = readFileFromGCS;
