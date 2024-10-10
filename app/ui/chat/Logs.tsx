export default function Logs({ chat }: { chat: [] }) {
  interface Chat {
    id: string;
    message?: string;
    from?: string;
    dateCreated?: Date;
  }
  return (
    <div>
      {chat.map((item: Chat) => {
        return (
          <div key={item.id.toString()}>
            <p>{item.message} {item.from?.toString()}</p>
          </div>
        );
      })}
    </div>
  );
}
