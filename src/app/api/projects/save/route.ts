import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const projectData = await request.json();

    //creation date
    projectData.createdAt = new Date();

    const result = await db.collection("projects").insertOne(projectData);

    if (result.insertedId) {
      return NextResponse.json({
        success: true,
        projectId: result.insertedId,
      });
    }

    return NextResponse.json(
      { success: false, error: "Failed to save project" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
