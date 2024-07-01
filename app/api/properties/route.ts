import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { authOptions } from "@/utils/authOptions";
import { getSessionUser } from "@/utils/getSessionUser";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

// GET /api/properties
export const GET = async (request: any) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    // Get and validate logged in user
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = sessionUser;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image): image is File => (image as File).name !== "");

    // Create Property Data object to save to DB
    const propertyData = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      location: {
        street: formData.get("location.street") as string,
        city: formData.get("location.city") as string,
        state: formData.get("location.state") as string,
        zipcode: formData.get("location.zipcode") as string,
      },
      beds: parseInt(formData.get("beds") as string),
      baths: parseInt(formData.get("baths") as string),
      square_feet: parseInt(formData.get("square_feet") as string),
      amenities,
      rates: {
        nightly: parseFloat(formData.get("rates.nightly") as string),
        weekly: parseFloat(formData.get("rates.weekly") as string),
        monthly: parseFloat(formData.get("rates.monthly") as string),
      },
      seller_info: {
        name: formData.get("seller_info.name") as string,
        email: formData.get("seller_info.email") as string,
        phone: formData.get("seller_info.phone") as string,
      },
      images: [] as string[],
      owner: userId,
      is_featured: formData.get("is_featured") === "true",
    };

    // Upload images to Cloudinary
    const imageUploadPromises = [];
    for (const image of images) {
      // Convert to format that can be processed
      const imageBuffer = await image.arrayBuffer();
      // const imageArray = Array.from(new Uint8Array(imageBuffer));
      // const imageData = Buffer.from(imageArray);
      // const imageB64 = imageData.toString("base64");

      const imageBase64 = Buffer.from(
        Array.from(new Uint8Array(imageBuffer))
      ).toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertypulse",
        }
      );

      imageUploadPromises.push(result.secure_url);
      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);

    // Save to DB
    await newProperty.save();

    // Redirect to newly created Property
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify({ message: "success" }), {
    //   status: 200,
    // });
  } catch (error) {
    return new Response("Failed to add property", { status: 500 });
  }
};
