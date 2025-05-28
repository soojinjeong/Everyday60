// Import required modules
const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const cors = require("cors");
const credentials = require("./server-account.json"); // Google Service Account credentials

const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

//Google Sheets ID where reservation data will be stored
const spreadsheetId = "17D0kq7947PxmCaNj7SZ3HW09_Pu7E9Qc1O0Huv1AX5o";

// Function to set up authenticated Google Sheets client
async function accessSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials, // Loaded form service account file
    scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Permission to modify sheets
  });

  const client = await auth.getClient(); // Get authenticated client
  const sheets = google.sheets({ version: "v4", auth: client }); // Google Sheets API client

  return sheets;
}

// API endpoint to receive reservation data
app.post("/reserve", async (req, res) => {
    try {
      const sheets = await accessSheet(); // Authenticate and connect to Google Sheets
  
      // Destructure data from request body
      const {
        name,
        email,
        phone,
        guests,
        date,
        time,
        seating,
        notes
      } = req.body;
  
      // Append the reservation data to the sheet starting at cell A2
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "A2", // Appends data to the next available row
        valueInputOption: "USER_ENTERED", // User-entered formatting (e.g., automatic date parsing)
        resource: {
          values: [[name, email, phone, guests, date, time, seating, notes]],
        },
      });
  
      // Send success response
      res.status(200).send("Reservation saved.");
    } catch (error) {
      // If error occurs, log and send error response
      console.error("Error:", error);
      res.status(500).send("Failed to save reservation.");
    }
  });

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });