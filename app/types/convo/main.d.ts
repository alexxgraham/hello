import { Dispatch, SetStateAction } from "react";

export type DispatchAction<T> = Dispatch<SetStateAction<T>>;

export interface Popup {
  open: boolean;
  setOpen: DispatchAction<boolean>;
}

export interface TextInputField {
  placeholder: string;
  autoFocus?: boolean;
  specialClass?: string;
}

export interface Message {
  id: string;
  incoming?: boolean;
  outgoing?: boolean;

  author: "self" | "nonself";
  timestamp: Date;
  content: string;
}

export interface Available {
  firstTokenAuthor: "delivered" | "received";
  messageTokens: Message[];
}
