import Link from "next/link";
import React from "react";
import SigninButton from "./SigninButton";
import { Session } from "inspector";

const AppBar = () => {
  return (
    <header className="">
      <nav className="navbar navbar-dark bg-dark">
        <form className="form-inline">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">

            </input>
          </div>
        </form>
        <Link className="transition-colors hover:text-blue-500" href={"/"}>
          Home Page
        </Link>
        <Link className="transition-colors hover:text-blue-500" href={"/UserPost"}>
          User Post Page
        </Link>
        <SigninButton />
      </nav>
    </header>
  );
};

export default AppBar;
