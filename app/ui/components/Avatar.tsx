import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";

export default function Avatar({ imageAddress }: { imageAddress: string }) {
  return (
    <div>
      {imageAddress ? (
        <Image
          className="rounded-full object-cover w-[40px] h-[40px]"
          width={300}
          height={300}
          src={imageAddress}
          alt="avatar"
        />
      ) : (
        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-neutral-200">
          <UserIcon className="w-6 h-6 text-neutral-500" />
        </div>
      )}
    </div>
  );
}
