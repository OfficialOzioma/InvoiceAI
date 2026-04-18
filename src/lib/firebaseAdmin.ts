import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

// Usually we would use a service account key file.
// For this environment, we might use default credentials if available,
// but since we have a firebase-applet-config.json, we'll try to use that
// or environment variables.

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    // For now we'll rely on the platform to have the environment configured
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
