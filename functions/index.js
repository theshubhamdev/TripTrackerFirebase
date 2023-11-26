/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//http request method
exports.sendHttpPushNotification = functions.https.onRequest((req, res) => {
    const fcmToken = req.query.fcmToken;
    const tripDate = req.query.tripDate;
    const title = req.query.title;
    const body = req.query.body;

    const payload = {
        token: fcmToken,
        notification: {
            title,
            body
        },
        data: {
            body,
            tripDate: tripDate ? tripDate : '',
        }
    };
    admin.messaging().send(payload).then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        return {success: true};
    }).catch((error) => {
        return {error: error.code};
    });
})