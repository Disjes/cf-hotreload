"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.hotReloadFunction = void 0;
const fileReader_1 = require("./fileReader");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const hotReloadFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bucketName = 'gdoc-md-sync-391822-sources';
    const fileName = 'hotReloadModule.js';
    const projectId = 'gdoc-md-sync-391822';
    try {
        const content = yield (0, fileReader_1.readFileFromGCS)(bucketName, fileName, projectId);
        //Install dependencies
        // Writing the code to a temp file
        const tempFilePath = path.join('/tmp', fileName);
        fs.writeFileSync(tempFilePath, content);
        const valueFromRequest = req.body.name;
        // Dynamically import the temp file module
        const moduleFromGCS = yield Promise.resolve(`${tempFilePath}`).then(s => __importStar(require(s)));
        const result = moduleFromGCS.default(valueFromRequest);
        console.log(result);
        res.send(result);
    }
    catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Error reading file.');
    }
});
exports.hotReloadFunction = hotReloadFunction;
