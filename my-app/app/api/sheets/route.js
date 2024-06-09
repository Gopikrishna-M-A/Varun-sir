import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { ris, version, sheetName } = await request.json();

  console.log("data", ris);
  console.log("version", version);
  let prependedData

  if(version == 1){
    prependedData = ris.map((row, index) => [`PM${index + 1}`, ...row]);
  }else{
    prependedData = ris.map((row, index) => [`SE${index + 1}`, ...row]);
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });
    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    // Check if sheet exists
    const {
      data: { sheets: existingSheets },
    } = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });

    const sheetExists = existingSheets.some(
      (sheet) => sheet.properties.title === sheetName
    );

    // Create sheet if it doesn't exist
    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName,
                },
              },
            },
          ],
        },
      });
    }

    const startColumn = version === 1 ? "A" : version === 2 ? "E" : "A";
    // const range = `${startColumn}2`;
    const range = `${sheetName}!${startColumn}3`;

    const headers = [
      { range: `${sheetName}!A1`, value: "PROJECT MANAGEMENT STEPS" },
      { range: `${sheetName}!E1`, value: "SYSTEMS ENGINEERING STEPS" },
      { range: `${sheetName}!B2`, value: "alpha" },
      { range: `${sheetName}!F2`, value: "alpha" },
      { range: `${sheetName}!C2`, value: "beta" },
      { range: `${sheetName}!G2`, value: "beta" },
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: prependedData,
      },
    });

    // Update headers
    const updateRequests = headers.map((header) => ({
      range: header.range,
      values: [[header.value]],
    }));

    for (const updateRequest of updateRequests) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: updateRequest.range,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: updateRequest.values,
        },
      });
    }

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
