
import { UserIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";

export default function Logs({
  chat,
  userId,
  currentUserImage,
  userFromContactImage,
}: {
  chat: [];
  userId: string;
  currentUserImage: string;
  userFromContactImage: string;
}) {

  return (
    <div>
      {chat.map(
        (item: {
          id: string;
          message?: string;
          from?: string;
          dateCreated?: Date;
        }) => {
          const isFromCurrentUser = userId === item.from?.toString();
          
          return (
            <div
              key={item.id.toString()}
              className={clsx("flex flex-col ml-2 mr-2 my-6", {
                "items-end": isFromCurrentUser,
              })}
            >
              <div>
                <div className="flex gap-2">
                  {isFromCurrentUser && (
                    <p className="text-right w-full pr-3 text-sm text-neutral-500">You</p>
                  )}
                  <div className="w-[32px]"></div>
                </div>

                <div className="flex gap-2 items-center">
                  {!isFromCurrentUser && (
                    <Avatar address={userFromContactImage} />
                  )}
                  <div
                    className={clsx("p-3 rounded-full w-fit text-sm font-medium", {
                      "bg-blue-500  text-white": isFromCurrentUser,
                      "bg-neutral-200": !isFromCurrentUser,
                    })}
                  >
                    <p>{item.message}</p>
                  </div>
                  {isFromCurrentUser && <Avatar address={currentUserImage} />}
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

function Avatar({ address }: { address: string }) {
  return (
    <div>
      {address ? (
        <Image
          src={address}
          className="h-[32px] w-[32px] rounded-full"
          height={1000}
          width={1000}
          alt="user profile"
        />
      ) : (
        <div className="w-[32px] h-[32px] bg-neutral-300 rounded-full flex items-center justify-center">
          <div className="w-6 h-6">
            <UserIcon className="text-neutral-500" />
          </div>
        </div>
      )}
    </div>
  );
}
