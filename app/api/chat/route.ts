import Ably from 'ably';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/user/data';

export const revalidate = 0;

export async function GET(request : Request) {
    const session = await auth();
    const email = session?.user?.email;
    const user = await fetchUserByEmail(email);

    const client = new Ably.Rest(process.env.ABLY_API_KEY!);
    const tokenRequestData = await client.auth.createTokenRequest({
        clientId: user?.id
    });

    return Response.json(tokenRequestData);
}