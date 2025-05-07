import { sanityClient } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

// 1️⃣ Ensure this runs on Node.js, not Edge, to support streams:
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  console.log(request.headers);

  try {
    // 2️⃣ Parse incoming multipart/form-data
    const form = await request.formData();
    const files = form.getAll("images") as File[];
    const imageNameValues = form.getAll("imageNames");
    const imageNames: string[] = JSON.parse(imageNameValues[0] as string);

    if (!files || files.length < 1 || imageNames.length < 1) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 },
      );
    }

    // 3️⃣ Upload each image to Sanity
    const uploadPromises = files.map(async (file, idx) => {
      // Sanity client accepts File/Blob or ArrayBuffer/Stream :contentReference[oaicite:9]{index=9}
      const asset = await sanityClient.assets.upload("image", file, {
        filename: imageNames[idx],
        contentType: file.type,
      });

      return {
        _id: asset._id,
        url: asset.url,
        metadata: asset.metadata, // dimensions, lqip, etc.
      };
    });

    const assets = await Promise.all(uploadPromises);

    // 4️⃣ Return array of uploaded assets
    return NextResponse.json({ success: true, assets }, { status: 200 });
  } catch (err: any) {
    console.error("Sanity upload error:", err);
    return NextResponse.json(
      { error: "Image upload failed", details: err.message },
      { status: 500 },
    );
  }
}
