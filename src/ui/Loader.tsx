import React from "react";

import { cardio } from "ldrs";

cardio.register();

function Loader() {
  return <l-cardio size="100" stroke="4" speed="2" color="white"></l-cardio>;
}

export default Loader;
