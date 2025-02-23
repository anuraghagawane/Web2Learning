import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  console.log(response.data);
  return NextResponse.json({
    data: response.data,
  });
}
