import { Form } from "../../components/BaseComponents/Form/Form";
import { Input } from "../../components/BaseComponents/Input/Input";
import { Button } from "../../components/BaseComponents/Button/Button";
import { ValidationConfig, useForm } from "@/hooks/useForm";
import { api } from "@/utils/api";
import React from "react";

import { useRouter } from "next/router";

type FormState = {
  name: string;
  date: Date;
  isCyclic?: boolean;
  timePeriod?: number;
  endAt?: Date;
  errors: {
    name: boolean;
    date: boolean;
    isCyclic: boolean;
    timePeriod: boolean;
    endAt: boolean;
  };
};

const initialState: FormState = {
  name: "",
  isCyclic: false,
  timePeriod: undefined,
  endAt: undefined,
  date: new Date(),
  errors: {
    name: false,
    date: false,
    isCyclic: false,
    timePeriod: false,
    endAt: false,
  },
};

export const AddEventForm = () => {
  const { state, handleValue, onSubmit } = useForm<FormState>(initialState);
  const { mutateAsync: saveEvent } = api.event.save.useMutation();
  const { back } = useRouter();
  const refetchEvents = api.event.getEvents.useQuery().refetch;

  const validationConfig: ValidationConfig<FormState> = {
    name: { required: true },
    date: { required: true },
    isCyclic: { required: false },
    timePeriod: { dependsOn: "isCyclic", required: true },
    endAt: { dependsOn: "isCyclic", required: true },
  };

  const getDateValue = (date: Date) => date.toISOString().split("T")[0];

  const save = async () => {
    await saveEvent({ ...state });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    await onSubmit(e, save, validationConfig);
    await refetchEvents();
    back();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={state.name}
        onChange={(e) => handleValue("name", e.currentTarget.value)}
        error={state.errors.name}
      />
      <input
        type="checkbox"
        onChange={(e) => handleValue("isCyclic", e.currentTarget.checked)}
        checked={state.isCyclic}
      ></input>
      {state.isCyclic && (
        <>
          <Input
            type="number"
            value={state.timePeriod?.toString() ?? ""}
            onChange={(e) => handleValue("timePeriod", e.currentTarget.value)}
            error={state.errors.timePeriod}
          />
          <Input
            type="date"
            value={getDateValue(state.endAt ?? new Date()) ?? ""}
            onChange={(e) =>
              handleValue("endAt", new Date(e.currentTarget.value))
            }
            error={state.errors.endAt}
          />
        </>
      )}
      <Input
        type="date"
        value={getDateValue(state.date) ?? ""}
        onChange={(e) => handleValue("date", new Date(e.currentTarget.value))}
        error={state.errors.date}
      />
      <Button type="submit" onClick={handleSubmit} text="Zapisz" />
    </Form>
  );
};
