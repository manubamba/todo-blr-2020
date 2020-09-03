import React from "react";

import ToDoRow from "../components/ToDoRow";
export default {
  title: "Example/ToDoRow",
  component: ToDoRow,
  argTypes: {
    onApprove: { action: "approved" },
    onChangeComplete: { action: "onChangeComplete" },
  },
};

const mockToDo = {
  title: "test",
  isComplete: false,
  isApproved: false,
  author: {
    uid: "uid",
    displayName: "Author",
    photoURL:
      "https://lh3.googleusercontent.com/a-/AOh14GhnlHGx19Hg34P4pPVp8Bkx9hL4de6ykgZdgNNy2fs",
  },
  approver: {
    uid: "uid2",
    displayName: "Approver",
  },
  currentUser: {
    uid: "uid2",
    displayName: "Current User",
  },
};

const Template = (args) => <ToDoRow {...args} />;

export const LoggedIn = Template.bind({});

LoggedIn.args = mockToDo;
