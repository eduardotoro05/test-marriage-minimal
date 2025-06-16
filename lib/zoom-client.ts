// Zoom API client using direct HTTP requests

interface ZoomTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

// Get Zoom access token using Server-to-Server OAuth
async function getZoomAccessToken(): Promise<string> {
  const accountId = process.env.ZOOM_ACCOUNT_ID
  const clientId = process.env.ZOOM_CLIENT_ID
  const clientSecret = process.env.ZOOM_CLIENT_SECRET

  if (!accountId || !clientId || !clientSecret) {
    throw new Error("Zoom credentials not configured")
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "account_credentials",
      account_id: accountId,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to get Zoom access token: ${response.statusText}`)
  }

  const data: ZoomTokenResponse = await response.json()
  return data.access_token
}

// Create a Zoom meeting
export async function createZoomMeeting({
  topic,
  startTime,
  duration,
  timezone = "America/New_York",
  agenda,
  settings = {},
}: {
  topic: string
  startTime: string // ISO format
  duration: number // in minutes
  timezone?: string
  agenda?: string
  settings?: Record<string, any>
}) {
  try {
    const accessToken = await getZoomAccessToken()

    // Default settings for ceremony
    const defaultSettings = {
      host_video: true,
      participant_video: true,
      join_before_host: false,
      mute_upon_entry: true,
      waiting_room: true,
      meeting_authentication: false,
      auto_recording: "cloud",
      ...settings,
    }

    const meetingData = {
      topic,
      type: 2, // Scheduled meeting
      start_time: startTime,
      duration,
      timezone,
      agenda: agenda || "Online Marriage Ceremony",
      settings: defaultSettings,
    }

    // Get the first user as the host (using 'me' as default)
    const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create Zoom meeting: ${response.statusText}`)
    }

    const meeting = await response.json()
    return meeting
  } catch (error) {
    console.error("Error creating Zoom meeting:", error)
    throw error
  }
}

// Update an existing Zoom meeting
export async function updateZoomMeeting(
  meetingId: number,
  updates: {
    topic?: string
    start_time?: string
    duration?: number
    agenda?: string
    settings?: Record<string, any>
  },
) {
  try {
    const accessToken = await getZoomAccessToken()

    const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error(`Failed to update Zoom meeting: ${response.statusText}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating Zoom meeting:", error)
    throw error
  }
}

// Delete/cancel a Zoom meeting
export async function deleteZoomMeeting(meetingId: number) {
  try {
    const accessToken = await getZoomAccessToken()

    const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to delete Zoom meeting: ${response.statusText}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting Zoom meeting:", error)
    throw error
  }
}

// Get meeting details
export async function getZoomMeeting(meetingId: number) {
  try {
    const accessToken = await getZoomAccessToken()

    const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get Zoom meeting: ${response.statusText}`)
    }

    const meeting = await response.json()
    return meeting
  } catch (error) {
    console.error("Error getting Zoom meeting:", error)
    throw error
  }
}
