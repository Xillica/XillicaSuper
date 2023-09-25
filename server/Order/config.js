// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  type: "service_account",
  projectId: "xillicasuper",
  private_key_id: "247adf458a37cf8d258f18bb38bdc8382291d42f",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVbo9hIUYKuU7o\nqmYEv3hfiLon+nRep/h3Csoebh5LbV8TVRbW1KFwwLVZQClm9kdHdPSvRmlwZ7Tj\nwmjgFnUQxG8aDsmigwjEtkXHYFg9Yp4PXi29PAfpOOCW5Uqzpx4Dahix0M/S5BTc\n6JOWgLHlL7yP7Ck7+4hzk3HE92r3gDsEYXNpzt2fVkPf3l/9ZmiE0p31JervBYI9\nxmWf/xUYvwD40jh4j5A7W9xis7IwKnqnUO/0dbJqZv10B/Azrl0WubtM9tWBTGrv\n/gq2tF0QR0Llx8YXfv2w0ipJ6g3mI9kSwXpfAu3iEKt22POFYEMXYpmwbKepajc0\nB5w/rQBNAgMBAAECggEAWdcEloOdipUPMKPNdrEsF7ajeYGU62U0EtPhWWbL7L8Y\nlrgp+Xsei6oqi+uUoekH/v2to3v1lSGqRHcIk08QruKoy6Su3m/eyILbI34cFpbE\n5r4jbbTvtY3CB/Jze+TcHt7Rj0PQvzpPx99EhMUeXNU3v7NOdhe+i7vkV184UP6N\nz4KbOgicb6XZqFtfZ/OyYdzNzRY+g8jACyX6oVMMUF1SW//CK2jDpHQAWN+D/Du7\nz612su4EBxhJ4Gk3Rcsm+8FHNBws84rKCB3OeaIZB7mLTKEn+vToK6tjR99bMgw3\n9cqLZ4lBzi7b09L+2pbxh0lvKGlXyyBJIXxaGdOFhwKBgQDqUJDB3fjIhH8eThqR\nidG4PVsZQ8OG7R35CBMmZeL4X0Gm5ya1qoMKLaPKRpepurFMJrw7MmZt8I57FfnN\nz48o4BJ11GtNYLFIk0/XPp7rbgqNu73PMwJ7P940IQWJx7cdasaioWB9H34o+z0A\nywUtlUZl7yUbKsgQ55ev695vMwKBgQDpLzvpTG/+mUMy97fdi//6zjWVRvBVx/VR\nd2IT5qUMvtHX36jT1w5A/ZR3Mmo+0EehlnlpEBjTgFynwkgsfM/P1Dp0pEOHRrdg\nfenOFQLHzc0K2mwj3wRUONKszelFevu3ud3n/AbFhyINFfRCOTMz2fQ9IQ6t/tIR\nkcR7FnTSfwKBgH1vm87tEZ3msFZ84WRAL3E+B2LDEA1PKtiCJh5MNPFZrT+4RtTB\n71yniiNjHxXRx9BIfEQEeyknul7SKOSw1KbBLaC+kqLdvIppsjg8Yb8PLb8qXjZp\nzE5GpqGpe9mCfNjWrHerhIf3MAaoWMPv61m3q/QtzeN5R5klIeMflfhZAoGBAIqU\nS6KmjphcNReBKIA9x28iRa3lbsdMAnrb3Cm/lK8yaDtG7GqZEBuHmEgOah3SYf+i\nEZ1it55aVrZMO+BUfJwioGrZhFhMqoZpzh1vVyuvHwAoNsRKsaPr8ShJZyynnhje\nGQbZPJz/ZjkopvUEUW2rRf9eOf8lxWozmvUbr2m5AoGAYjeM2sMh2xMAO8wqjYin\nP+NxiFXCiBodbOd5QWRDut/anVNRiYxHt4+bBx9AACCJUphRld3fLMkFiT61/2S6\nxwbY4UjwdoIh/Sxwb4GWl8pbx43cgN2Fap3h6GijcL2d91LpeZF3H0l7asVJ52aH\ndvr4zW6JokdO93Mcuo2s04w=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-m7hqa@xillicasuper.iam.gserviceaccount.com",
  client_id: "114667059484285032338",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m7hqa%40xillicasuper.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Access the Firestore collection
const orderCollection = collection(db, "orderCollection");

console.log("Firebase database is connected.");

export default orderCollection;
