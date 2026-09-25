export type MockMember = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const members: MockMember[] = [
  {
    id: 1,
    name: "Dr. Alice Sharma",
    email: "alice@biocollab.test",
    password: "alice123",
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    email: "rahul@biocollab.test",
    password: "rahul123",
  },
  {
    id: 3,
    name: "Dr. Priya Nair",
    email: "priya@biocollab.test",
    password: "priya123",
  },
];
