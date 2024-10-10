import Image from "next/image"

export default function Avatar({ imageAddress }: { imageAddress: string }) {
    return (
        <div>
            <Image
              className="rounded-full"
              width={40}
              height={40}
              src={imageAddress}
              alt="contact avatar"
            />
        </div>
    )
}
