import { fetchUserChannels } from "@/app/lib/channel/data";  

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId;
    const channels = await fetchUserChannels(userId);
    const result = { data: channels, message: "Successfull" };

    return Response.json(result);
  } catch (error) {
    const result = { data: {}, message: "Failed" };

    return Response.json(result);
  }
}
