import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  ValidMessage,
} from "@atlaskit/form";
import React from "react";

function validate(value) {
  if (!value) {
    return "INCORRECT_PHRASE";
  }
  return undefined;
}

const CreateTodo = ({ onSubmit }) => {
  const handleSubmit = (formState, form) => {
    // you can now do stuff with the form.
    console.log(form);
    onSubmit(formState.text);
    setTimeout(() => {
      form.restart();
      form.blur();
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      {({ formProps }) => (
        <form {...formProps} name="validation-example">
          <Field
            label="Enter the TODO task here"
            isRequired
            name="text"
            validate={validate}
            defaultValue=""
          >
            {({ fieldProps, error, meta: { valid } }) => (
              <>
                <Textfield {...fieldProps} />
                {valid && <ValidMessage>Valid</ValidMessage>}
                {error === "INCORRECT_PHRASE" && (
                  <ErrorMessage>Incorrect. Should not be empty</ErrorMessage>
                )}
              </>
            )}
          </Field>
          <FormFooter>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};

export default CreateTodo;
