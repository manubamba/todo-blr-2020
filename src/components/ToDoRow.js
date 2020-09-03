import React from "react";
import { Checkbox } from "@atlaskit/checkbox";
import Avatar from "@atlaskit/avatar";
import { Button } from "@atlaskit/button/dist/cjs/components/Button";
import Lozenge from "@atlaskit/lozenge";
const ToDoRow = ({
  isComplete = false,
  id,
  isApproved,
  title,
  approver,
  author,
  currentUser,
  onApprove,
  onChangeComplete,
}) => {
  const handleChange = (event) => {
    onChangeComplete(id, event.target.checked);
  };
  const handleApprove = () => {
    onApprove(id);
  };
  return (
    <div style={{ display: "flex", flex: "1", marginBottom: "15px" }}>
      {author && author.displayName && <Avatar src={author.photoURL} />}

      <span style={{ position: "relative", top: "7px" }}>
        <Checkbox
          isChecked={isComplete}
          label={title}
          onChange={handleChange}
        />
      </span>

      {isApproved && (
        <div>
          <Lozenge appearance="success">Approved</Lozenge>
        </div>
      )}

      {!isApproved &&
        approver &&
        currentUser &&
        currentUser.uid === approver.uid && (
          <Button appearance="subtle-link" onClick={handleApprove}>
            Approve
          </Button>
        )}
      {!isApproved &&
        approver &&
        currentUser &&
        currentUser.uid !== approver.uid && (
          <div>
            <Lozenge css={{ height: "20px" }} appearance="removed">
              {approver.displayName}
            </Lozenge>
          </div>
        )}
    </div>
  );
};

export default ToDoRow;
