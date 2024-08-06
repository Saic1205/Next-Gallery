import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files = data.getAll("files"); // Retrieve all files

    if (files.length === 0) {
      console.log("No files found in the request");
      return NextResponse.json({ success: false, error: "No files provided" });
    }

    const appDir = process.cwd();
    const tmpDir = join(appDir, "tmp");
    await mkdir(tmpDir, { recursive: true });

    for (const file of files) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = join(tmpDir, file.name);
        console.log(`Writing file to ${path}`);
        await writeFile(path, buffer);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
