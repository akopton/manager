import { useEventForm } from "@/hooks/useEventForm";
import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Button } from "../BaseComponents/Button/Button";
import { useCallback, useEffect } from "react";

export const AddEventForm = () => {
  const { state, handleValue, handleSubmit } = useEventForm();

  const getDateValue = useCallback(
    (date: Date) => date.toISOString().split("T")[0],
    [state.date],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={state.name}
        onChange={(e) => handleValue("name", e.currentTarget.value)}
      />
      <Input
        type="date"
        value={getDateValue(state.date) || ""}
        onChange={(e) => handleValue("date", new Date(e.currentTarget.value))}
      />
      <Button type="submit" onClick={handleSubmit} text="Zapisz" />
    </Form>
  );
};
