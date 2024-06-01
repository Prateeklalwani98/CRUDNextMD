import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const { id } = params;
  const { title, note } = await request.json();
  await connectMongoDB();

  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, note },
      { new: true }
    );

    if (!updatedTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Topic updated", topic: updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { error: "Failed to update topic" },
      { status: 500 }
    );
  }
}
