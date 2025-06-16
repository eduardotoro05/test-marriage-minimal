import { NextResponse } from "next/server"
import { createZoomMeeting } from "@/lib/zoom-client"

export async function GET() {
  try {
    // Test the Zoom API by creating a test meeting
    const meeting = await createZoomMeeting({
      topic: "Test Meeting",
      startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      duration: 30,
      agenda: "Testing Zoom API integration",
    })

    return NextResponse.json({
      success: true,
      message: "Zoom API test successful",
      meeting: {
        id: meeting.id,
        join_url: meeting.join_url,
        start_url: meeting.start_url,
        password: meeting.password,
        start_time: meeting.start_time,
      },
    })
  } catch (error) {
    console.error("Zoom API test failed:", error)
    return NextResponse.json({
      success: false,
      error: "Zoom API test failed",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
