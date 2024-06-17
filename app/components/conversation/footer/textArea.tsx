import { Form } from "@remix-run/react";

import { TextInput } from "../utils/items";

export const ConversationTextArea = () => {
  return (
    <footer className="self-end bg-secondary px-4 pb-6 w-full">
      <Form>
        <TextInput placeholder="Start typing here..." specialClass="pt-2" />
      </Form>
    </footer>
  );
};
