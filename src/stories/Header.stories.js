import React from "react";

import { Header } from "../components/Header";

export default {
  title: "Example/Header",
  component: Header,
};

export const LoggedIn = () => <Header user={{}} />;

export const LoggedOut = () => <Header />;
