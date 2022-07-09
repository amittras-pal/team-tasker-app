// Use this file to generate a random hex string to use as JWT_SECRET environment variable.

// Run on terminal.
const crypto = require("crypto");
console.log(crypto.randomBytes(32).toString("hex"));
