import { fetchUserNotifications } from "@/app/lib/notification/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId;
    const user = await fetchUserNotifications(userId);

    return Response.json({ data: user, success: true });
  } catch (error) {
    return Response.json({ data: {}, success: false });
  }
}
