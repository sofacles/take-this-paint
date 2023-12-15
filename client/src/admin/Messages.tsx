import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  GetAdminMessages,
  getAdminPersonWithEmails,
  deletePersonWithEmail,
  deleteMessage,
  updateEmailConfirmed,
} from "./useAdminService";
import BTD from "./BorderedTableCell";

type CheckBoxRefType = HTMLInputElement | null;
const AdminMessages = () => {
  const { messages, setMessages } = GetAdminMessages();
  const checkboxesForEmailConfirmed = useRef<CheckBoxRefType[]>([]);

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

  const onEmailConfirmedChange = (index: number, confirmed: boolean) => {
    const associatedPWE = personsWithEmails[index];
    updateEmailConfirmed(associatedPWE._id, confirmed);
  };

  const onDeletePWEClick = (id: string) => {
    deletePersonWithEmail(id);
  };

  const { personsWithEmails, setPersonsWithEmails } =
    getAdminPersonWithEmails();
  let thePWEs = personsWithEmails?.map((pwe, index) => {
    return (
      <tr key={pwe._id}>
        <BTD title={pwe._id}>{`...${pwe._id.slice(-6)}`}</BTD>
        <BTD>{`...${pwe.email.slice(-6)}`}</BTD>
        <BTD>{pwe.secret}</BTD>
        <BTD>
          <input
            defaultChecked={pwe.emailConfirmed}
            type="checkbox"
            ref={(el) => {
              checkboxesForEmailConfirmed.current[index] = el;
            }}
            onChange={(evt) => {
              onEmailConfirmedChange(index, evt.target.checked);
            }}
          />
        </BTD>
        <BTD>
          <button
            className="bg-emerald-400 border-2 rounded-md p-1  hover:border-red-500"
            onClick={() => {
              onDeletePWEClick(pwe._id);
              setPersonsWithEmails(
                personsWithEmails.filter((p) => p._id !== pwe._id)
              );
            }}
          >
            delete
          </button>
        </BTD>
      </tr>
    );
  });

  return (
    <div>
      <p>
        <Link
          className="underline text-blue-600 hover:text-amber-800 mb-3"
          to="/adminPaints"
        >
          Admin paints
        </Link>
      </p>

      <h2 className="text-2xl mb-2"> Messages </h2>
      <table className="border border-collapse mb-4">
        <thead>
          <tr className="border">
            <th>Id</th>
            <th>Text</th>
            <th>donorEmail</th>
            <th>interestedPartyEmail</th>
            <th>postedOn</th>
            <th>command</th>
          </tr>
        </thead>
        <tbody>{theMessages}</tbody>
      </table>

      <h2 className="text-2xl mb-2"> PersonWithEmails </h2>
      <table className="mb-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>email</th>
            <th>secret</th>
            <th>emailConfirmed</th>
            <th>command</th>
          </tr>
        </thead>
        <tbody>{thePWEs}</tbody>
      </table>
    </div>
  );
};

export default AdminMessages;
