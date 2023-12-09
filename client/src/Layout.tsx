import { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import PaintBucket from "./BucketIcon";
import "./App.css";

function Layout({ children }: PropsWithChildren) {
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col  py-6 px-6 lg:px-8  min-w-fit">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center mr-4">
            <PaintBucket />
            <span className="ml-4 text-2xl text-emerald-600 font-semibold whitespace-nowrap dark:text-white">
              Take this paint
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setHamburgerClicked((old) => !old);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              !hamburgerClicked ? "hidden" : ""
            } w-full md:block  md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 mb-2 md:mb-0 pl-3 focus:bg-emerald-300 md:focus:bg-transparent md:focus:underline pr-4 text-emerald-700 bg-emerald-100 rounded md:bg-transparent md:text-emerald-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className="block py-2 mb-2 md:mb-0 pl-3 focus:bg-emerald-300 md:focus:bg-transparent md:focus:underline pr-4 text-emerald-700 bg-emerald-100 rounded md:bg-transparent md:text-emerald-700 md:p-0 dark:text-white"
                  to="/view-paints"
                >
                  View paints
                </Link>
              </li>
              <li>
                <Link
                  to="/give-away"
                  className="block py-2 mb-2 md:mb-0 pl-3 focus:bg-emerald-300 md:focus:bg-transparent md:focus:underline pr-4 text-emerald-700 bg-emerald-100 rounded md:bg-transparent md:text-emerald-700 md:p-0 dark:text-white"
                >
                  Give away
                </Link>
              </li>
              <li>
                <Link
                  to="/adminPaints"
                  className="block py-2 mb-2 md:mb-0 pl-3 focus:bg-emerald-300 md:focus:bg-transparent md:focus:underlinepr-4 text-emerald-700 bg-emerald-100 rounded md:bg-transparent md:text-emerald-700 md:p-0 dark:text-white"
                >
                  Admin paints
                </Link>
              </li>
              <li>
                <Link
                  to="/adminMessages"
                  className="block py-2 mb-2 md:mb-0 pl-3 focus:bg-emerald-300 md:focus:bg-transparent md:focus:underlinepr-4 text-emerald-700 bg-emerald-100 rounded md:bg-transparent md:text-emerald-700 md:p-0 dark:text-white"
                >
                  Admin messages
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        onClick={() => {
          setHamburgerClicked(false);
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
