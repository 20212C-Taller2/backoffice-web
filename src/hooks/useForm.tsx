import { useState } from "react"

export const useForm = (initialState = {}) => {
  const [fields, setFields] = useState(initialState)

  const reset = () => {
    setFields(initialState)
  }

  const handleInputChange = ({ target }) => {
    setFields(currentFields => ({
      ...currentFields,
      [target.name]: target.value,
    }))
  };

  return [fields, handleInputChange, reset]
};
