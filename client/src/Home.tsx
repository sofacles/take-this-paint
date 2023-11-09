import { Link } from "react-router-dom";

const Home = () => {
  //TODO: fix
  document.cookie = "HasSeenHomeScreen=true";

  return (
    <div className="px-6 py-4">
      <p>
        You've finished painting and there's half a gallon of paint left. You
        can't take it back to the paint store because it's already been tinted.
        You could dispose of it, but that's complicated too. The proper way to
        do that is to take the lid off and let the water evaporate out of the
        paint, which takes approximately forever.
      </p>

      <p>What to do?</p>

      <p>
        This web app is a way to connect people who would like to be rid of
        paint with people who are about to start a painting project using the
        same color.
      </p>

      <p>
        You're welcome to test out the site: browse the (currently fake) data,
        post a new paint but clicking on an existing paint to send an email to
        the donor of that paint is currently broken.
      </p>
    </div>
  );
};

export default Home;
