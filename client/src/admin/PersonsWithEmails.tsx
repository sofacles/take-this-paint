import { useRef } from "react";
import {
  getAdminPersonWithEmails,
  deletePersonWithEmail,
  updateEmailConfirmed,
} from "./useAdminService";
import Admin from "./Admin";
import BTD from "./BorderedTableCell";

type CheckBoxRefType = HTMLInputElement | null;
const PersonsWithEmails = () => {
  const checkboxesForEmailConfirmed = useRef<CheckBoxRefType[]>([]);

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
        <BTD title={pwe.email}>{`...${pwe.email.slice(-6)}`}</BTD>
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
      <Admin />
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

export default PersonsWithEmails;
