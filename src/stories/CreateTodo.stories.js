import React from "react";

import CreateTodo from "../components/CreateTodo";
export default {
  title: "Example/CreateTodo",
  component: CreateTodo,
  argTypes: { onSubmit: { action: "submit" } },
};

const Template = (args) => <CreateTodo {...args} />;

export const LoggedIn = Template.bind({});
