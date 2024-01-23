import { useEventForm } from "@/hooks/useEventForm";
import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Button } from "../BaseComponents/Button/Button";
import { useCallback } from "react";

export const AddEventForm = () => {
  const { state, handleValue, handleSubmit } = useEventForm();

  const getDateValue = (date: Date) => date.toISOString().split("T")[0];

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={state.name}
        onChange={(e) => handleValue("name", e.currentTarget.value)}
        error={state.errors.name}
      />
      <Input
        type="date"
        value={getDateValue(state.date) || ""}
        onChange={(e) => handleValue("date", new Date(e.currentTarget.value))}
        error={state.errors.date}
      />
      <Button type="submit" onClick={handleSubmit} text="Zapisz" />
    </Form>
  );
};
