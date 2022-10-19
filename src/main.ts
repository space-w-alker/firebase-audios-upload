import dotenv from "dotenv"

import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
dotenv.config()

import { ServiceAccount } from "firebase-admin";
import { PathLike, readdirSync } from "fs";

initializeApp({
  credential: cert({
    project_id: process.env.PROJECT_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
} as ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = getStorage().bucket();

function uploadAll(): void {
  const folder = process.env.AUDIO_FOLDER as PathLike;
  const files = readdirSync(folder)
  for (let i = 0; i < files.length; i++) {
    const file_name = files[i];
    uploadOne(`${folder}/${file_name}`)
  }
}

async function uploadOne(path:string): Promise<void> {
  await bucket.upload(path);
}

uploadAll();
