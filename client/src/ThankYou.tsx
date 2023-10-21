import React from "react";
import { Link } from "react-router-dom";
const ThankYou = () => {
  return (
    <div className="px-6 py-4">
      <h1>Hey, Thanks for making your paint available!</h1>
      <div>
        Check your email for a confirmation link and click on the link inside.
        After you confirm, we'll put your paint on our site. If somebody is
        interested in receiving your paint, our system will relay an email from
        them to you. We will continue to show your paint until you click the
        cancel link in the confirmation email, but we will delete it after a
        year to save space.
      </div>
    </div>
  );
};

export default ThankYou;
