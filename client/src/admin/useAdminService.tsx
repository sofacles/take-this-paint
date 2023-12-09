import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetAdminMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      _id: "1",
      text: "",
      donorEmail: "",
      interestedPartyEmail: "",
      messageId: "",
      postedOn: "",
    },
  ]);
  useEffect(() => {
    fetch(`/api/admin/messages`)
      .then((x) => {
        if (x.status === 401) {
          navigate("/login");
        }
        return x.json();
      })
      .then((t) => {
        setMessages(t);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return messages;
};

const AdminPersonsWithEmailService = () => {
  const navigate = useNavigate();
  const [personsWithEmails, setPersonsWithEmails] = useState([
    {
      _id: "1",
      email: "",
      secret: "",
      emailConfirmed: false,
    },
  ]);
  useEffect(() => {
    fetch(`/api/admin/personsWithEmails`)
      .then((x) => {
        if (x.status === 401) {
          navigate("/login"); //TODO: move this 401 check into useAuthContext?
        }
        return x.json();
      })
      .then((t) => {
        setPersonsWithEmails(t);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return personsWithEmails;
};

const deleteMessage = (messageId: string) => {
  fetch("/api/admin/messages", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: messageId,
    }),
  }).then((x) => {
    if (x.status === 204) {
      return true;
    }
    return false;
  });
};
const updateEmailConfirmed = (
  personWithEmailId: string,
  confirmed: boolean
) => {
  fetch("/api/admin/personsWithEmails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailConfirmed: confirmed,
      _id: personWithEmailId,
    }),
  }).then((x) => {
    if (x.status === 204) {
      return true;
    }
    return false;
  });
};

const deletePersonWithEmail = (personWithEmailId: string) => {
  fetch("/api/admin/personsWithEmails", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: personWithEmailId,
    }),
  }).then((x) => {
    if (x.status === 204) {
      return true;
    }
    return false;
  });
};

export {
  GetAdminMessages,
  deleteMessage,
  AdminPersonsWithEmailService,
  deletePersonWithEmail,
  updateEmailConfirmed,
};
