import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function GET(req, res) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  console.log("token: ", token);
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const auth = new google.auth.OAuth2({
      credentials: {
        access_token: token,
      },
    });

    const calendar = google.calendar({ version: "v3", auth });

    const { data } = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log(data);

    return res.status(200).json(data.items);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
}
