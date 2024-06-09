import { NextResponse } from "next/server";

// In your Next.js pages or components
import connectDB from '../../../lib/mongoose';
// Call connectDB somewhere in your code
connectDB();

import Table from '../../../models/Table';


export async function POST(request) {
  const  data  = await request.json();
  const { id, ...restData } = data;
  console.log("id",id);
  console.log("restData",restData);
  try {
    let updatedData;

    if (id) {
      // Update existing table if ID is provided
      updatedData = await Table.findByIdAndUpdate(id, restData, { new: true });
    } else {
      // Create new table if no ID is provided
      updatedData = new Table(restData);
      await updatedData.save();
    }

    // const newData = new Table(data);
    // await newData.save();

    return NextResponse.json( updatedData , { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}



export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Fetch a single table by ID
    try {
      const data = await Table.findById(id);
      if (!data) {
        // If no data is found, return a 404 response
        return NextResponse.json("Data not found", { status: 404 });
      }
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  } else {
    // Fetch all tables
    try {
      const data = await Table.find();
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}



export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (!id) {
      // If no ID is provided, return a 400 Bad Request response
      return NextResponse.json("ID is required", { status: 400 });
    }

    // Attempt to delete the table by ID
    const deletedData = await Table.findByIdAndDelete(id);

    if (!deletedData) {
      // If no data is found with the provided ID, return a 404 response
      return NextResponse.json("Data not found", { status: 404 });
    }

    // Return a success response with the deleted data
    return NextResponse.json(deletedData, { status: 200 });
  } catch (error) {
    // If an error occurs during the deletion process, return a 500 Internal Server Error response
    return NextResponse.json(error.message, { status: 500 });
  }
}