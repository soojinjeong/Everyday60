const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const cors = require("cors");
const credentials = require("./server-account.json");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const spreadsheetId = "17D0kq7947PxmCaNj7SZ3HW09_Pu7E9Qc1O0Huv1AX5o";

async function accessSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  return sheets;
}

app.post("/reserve", async (req, res) => {
    try {
      const sheets = await accessSheet();
  
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
  
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "A2",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[name, email, phone, guests, date, time, seating, notes]],
        },
      });
  
      res.status(200).send("Reservation saved.");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Failed to save reservation.");
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });