import { useState } from "react";

//выносим общую логику в кастомный хук
const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const handleChange = (evt) => {
    //при каждом изменении инпута берем из evt инпут
    const input = evt.target;
    setForm({
      ...form,
      [input.name] : input.value
    })
  }
  return {form,handleChange}
}

export default useForm;