import axios from "axios";
import { request } from "http";
import React, { useEffect, useState } from "react";

const Username = () => {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/username", {
          withCredentials: true,
        });
        const responseData = await response.data;
        setUsername(responseData);
      } catch (error) {}
    };

    getUsername();
  }, []);

  return <div>{username}</div>;
};

export default Username;
