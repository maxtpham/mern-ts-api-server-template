import * as mongoose from "mongoose";

export type MongoClient = mongoose.Mongoose;

export const TYPES = {
    MongoClient: Symbol("MongoClient"),
};

export async function createMongoClient(connectionString: string) {
    return new Promise<MongoClient>((resolve, reject) => {
        mongoose.connect(connectionString);
        mongoose.connection.on("error", (e: Error) => {
            console.log("MongoClient failed to connect to:", connectionString, e);
            reject(e);
        });
        mongoose.connection.once("open", () => {
            console.log("MongoClient connected to:", connectionString);
            resolve(mongoose);
        });
    });
}

export async function createMockgoClient(connectionString: string) {
    return new Promise<MongoClient>((resolve, reject) => {
        var Mockgoose = require('mockgoose').Mockgoose;
        var mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage().then(function() {
            mongoose.connect(connectionString);
            mongoose.connection.on("error", (e: Error) => {
                console.log("MockgoClient failed to connect to:", connectionString, e);
                reject(e);
            });
            mongoose.connection.once("open", () => {
                console.log("MockgoClient connected to:", connectionString);
                resolve(mongoose);
            });
        });
    });
}
