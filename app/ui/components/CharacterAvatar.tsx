export default function CharacterAvatar({ name } : { name : string }) {
  return (
    <div className="rounded-full w-[40px] h-[40px] bg-neutral-500 flex items-center justify-center">
      <h2 className="text-white font-bold">{name.slice(0, 1)}</h2>
    </div>
  );
}
