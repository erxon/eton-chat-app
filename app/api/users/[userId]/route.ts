import { fetchUserById } from "@/app/lib/user/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId;
    const user = await fetchUserById(userId);

    return Response.json({ data: user, success: true });
  } catch (error) {
    return Response.json({ data: {}, success: false });
  }
}
