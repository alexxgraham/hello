import { v4 as uuidv4 } from "uuid";

import { Available, Message } from "~/types/convo/main";

const incomingMessages: Message[] = [
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-04T00:05:00.000-08:00"),
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-03T22:45:00.000-08:00"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-03T23:10:00.000-08:00"),
    content: "Nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-03T23:30:00.000-08:00"),
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-02T19:10:00.000-08:00"),
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-01T10:00:00.000-08:00"),
    content: "Nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-01T09:45:00.000-08:00"),
    content: "Curabitur pretium tincidunt lacus.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-01T09:30:00.000-08:00"),
    content: "Deserunt mollit anim id est laborum.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-01T08:30:00.000-08:00"),
    content: "Nulla gravida orci a odio.",
  },
  {
    id: uuidv4(),
    author: "nonself",
    incoming: true,
    timestamp: new Date("2024-06-01T08:00:00.000-08:00"),
    content: "Deserunt mollit anim id est laborum.",
  },
];

const outgoingMessages: Message[] = [
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-03T22:45:00.000-08:00"),
    content: "Nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-03T23:10:00.000-08:00"),
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-03T23:30:00.000-08:00"),
    content: "Curabitur pretium tincidunt lacus.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-03T23:45:00.000-08:00"),
    content: "Nulla gravida orci a odio.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-02T19:10:00.000-08:00"),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-01T10:00:00.000-08:00"),
    content:
      "Nullam varius, turpis et commodo pharetra, est eros bibendum elit.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-01T09:45:00.000-08:00"),
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-01T09:30:00.000-08:00"),
    content: "Nulla gravida orci a odio.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-01T08:30:00.000-08:00"),
    content: "Curabitur pretium tincidunt lacus.",
  },
  {
    id: uuidv4(),
    author: "self",
    outgoing: true,
    timestamp: new Date("2024-06-01T08:00:00.000-08:00"),
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
];

const messageTokens = [incomingMessages, outgoingMessages].flat();

export const availableMessages: Available = {
  firstTokenAuthor: "delivered",
  messageTokens,
};

export const availableConversations = [
  {
    name: "nonself",
    nickname: "Tommy",
    timestamp: new Date("2024-06-04T23:05:00.000-08:00"),
    preview:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    name: "Vicki",
    nickname: undefined,
    timestamp: new Date("2024-06-03T23:07:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Zeus",
    nickname: undefined,
    timestamp: new Date("2024-06-03T22:39:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Charlie",
    nickname: undefined,
    timestamp: new Date("2024-06-03T22:18:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Lottie",
    nickname: undefined,
    timestamp: new Date("2024-06-03T20:12:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Sam",
    nickname: undefined,
    timestamp: new Date("2024-06-03T19:56:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Tyler",
    nickname: undefined,
    timestamp: new Date("2024-06-03T19:46:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Sarah",
    nickname: undefined,
    timestamp: new Date("2024-06-03T19:30:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Katrissa",
    nickname: undefined,
    timestamp: new Date("2024-06-03T19:56:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Emily",
    nickname: undefined,
    timestamp: new Date("2024-06-03T19:46:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Jared",
    nickname: undefined,
    timestamp: new Date("2024-06-03T19:30:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "Sheldon",
    nickname: undefined,
    timestamp: new Date("2024-06-03T19:30:00.000-08:00"),
    preview: "Not Available",
  },
  {
    name: "John",
    nickname: undefined,
    timestamp: new Date("2024-06-03T19:30:00.000-08:00"),
    preview: "Not Available",
  },
];
