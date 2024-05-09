import { v4 as uuidv4 } from "uuid";

const createUUID = () => {
  const UUID = uuidv4();
  return UUID;
};

export { createUUID };
