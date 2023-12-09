import { useEffect, useState } from "react";
const ConfirmDonorEmail = () => {
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  useEffect(() => {
    fetch(`/api/confirmDonorEmail${window.location.search}`, {
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
        <p>Thanks again. We will now post your paint.</p>
      ) : (
        <p>Confirming email...</p>
      )}
    </div>
  );
};

export default ConfirmDonorEmail;
