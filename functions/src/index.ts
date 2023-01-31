import dotenv from "dotenv";
import * as admin from "firebase-admin";
import * as firebaseFunctions from "firebase-functions";
import * as ModuleAlias from "module-alias";

if (!admin.apps.length) {
  admin.initializeApp(firebaseFunctions.config().firebase);
}

dotenv.config();
ModuleAlias.addAliases({
  src: __dirname,
});

import App from "src/core/App";

const functions = firebaseFunctions.region("asia-southeast1");

// API
App.boot();

exports.api = functions.https.onRequest(App.getInstance());

// Functions
export * from "src/functions";
