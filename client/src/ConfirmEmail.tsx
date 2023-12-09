import { useEffect, useState } from "react";
const ConfirmEmail = () => {
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  useEffect(() => {
    fetch(`/api/confirmEmail${window.location.search}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 201) {
        setEmailConfirmed(true);
      }
    });
  }, []);

  return (
    <div className="px-6 py-4">
      {emailConfirmed ? (
        <p>
          Thanks again. We will forward your message to the donor of that paint.
        </p>
      ) : (
        <p>Confirming email...</p>
      )}
    </div>
  );
};

export default ConfirmEmail;
