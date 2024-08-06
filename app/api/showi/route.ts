import { readdir } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const appDir = process.cwd();
    const tmpDir = join(appDir, "tmp");
    const files = await readdir(tmpDir);

    const fileUrls = files.map((file) => ({
      name: file,
      url: `/api/image/${encodeURIComponent(file)}`,
    }));

    return NextResponse.json({ files: fileUrls });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
