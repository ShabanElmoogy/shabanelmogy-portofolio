import { useState, useEffect } from "react";
import { useForm } from "@formspree/react";

export const useContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, handleSubmit] = useForm("xovanoek");

  useEffect(() => {
    if (state.succeeded) {
      setEmail("");
      setMessage("");
    }
  }, [state.succeeded]);

  return {
    email,
    setEmail,
    message,
    setMessage,
    state,
    handleSubmit
  };
};
