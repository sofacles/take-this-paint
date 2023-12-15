import { GetAdminMessages, deleteMessage } from "./useAdminService";
import BTD from "./BorderedTableCell";

const AdminMessages = () => {
  const { messages, setMessages } = GetAdminMessages();

  const onDeleteMessage = (id: string) => {
    deleteMessage(id);
    setMessages(messages?.filter((m) => m._id !== id));
  };

  let theMessages = messages?.map((msg) => {
    return (
      <tr key={msg._id}>
        <BTD title={msg._id}>{`...${msg._id.slice(-6)}`}</BTD>
        <BTD>{msg.text}</BTD>
        <BTD title={msg.donorEmail}>{`...${msg.donorEmail.slice(-6)}`}</BTD>
        <BTD
          title={msg.interestedPartyEmail}
        >{`...${msg.interestedPartyEmail.slice(-6)}`}</BTD>
        <BTD>{new Date(msg.postedOn).toLocaleString()}</BTD>
        <BTD>
          <button
            className="bg-emerald-400 border-2 rounded-md p-1  hover:border-red-500"
            onClick={() => onDeleteMessage(msg._id)}
          >
            delete
          </button>
        </BTD>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>text</th>
            <th>donor email</th>
            <th>interested party email</th>
            <th>posted on</th>
            <th>commands</th>
          </tr>
        </thead>
        <tbody>{theMessages}</tbody>
      </table>
    </div>
  );
};

export default AdminMessages;
