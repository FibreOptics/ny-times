import React from "react";
import { GoBack } from "react/components/components";

const Page404 = ({ history }) => {
  const backHome = () => history.push("/");
  return (
    <div className='page404'>
      <GoBack goBack={backHome} />
      <h3>Page does not exists</h3>
    </div>
  );
};

export default Page404;
