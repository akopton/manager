import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Select } from "../BaseComponents/Select/Select";
import { Textarea } from "../BaseComponents/Textarea/Textarea";
import { Button } from "../BaseComponents/Button/Button";
import { useEffect, useState } from "react";
import { FormState, useNoteForm } from "@/hooks/useNoteForm";
import { useRouter } from "next/router";
import { MdKeyboardBackspace } from "react-icons/md";
import { api } from "@/utils/api";

type FormData = {
  [key: string]: string;
  title: string;
  text: string;
  listId: string;
};

type FormProps = {
  initialData?: FormData & { id: string };
};

export const AddNoteForm = (props: FormProps) => {
  const router = useRouter();
  const [initialFormState, setInitialFormState] = useState<
    { id: string } & FormState
  >();
  const { initialData } = props;
  const { data: usersList } = api.user.getUsers.useQuery();

  useEffect(() => {
    if (initialData) {
      const { title, text, listId, id } = initialData;
      const initialFormData = {
        id,
        title: { value: title, error: false },
        text: { value: text, error: false },
        listId: { value: listId, error: false },
      };
      setInitialFormState(initialFormData);
    }
  }, [initialData]);

  const {
    state,
    handleFieldValue,
    handleSubmit,
    selectOptions,
    userSelectOptions,
  } = useNoteForm(initialFormState);

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        height: "100%",
        alignItems: "flex-start",
      }}
    >
      <div className="align-center flex w-full justify-between">
        <Button
          type="button"
          icon={<MdKeyboardBackspace />}
          onClick={() => router.back()}
          style={{
            fontSize: "3rem",
            border: "none",
          }}
        />
        <Button
          type="submit"
          text="Zapisz"
          onClick={handleSubmit}
          style={{
            fontSize: "1.5rem",
          }}
        />
      </div>
      <Select
        options={selectOptions}
        onChange={(value) => handleFieldValue("listId", value)}
        value={state.listId.value}
        placeholder="Select or search..."
        searchMode
        error={state.listId.error}
      />
      <Select
        options={userSelectOptions}
        onChange={() => {}}
        value={""}
        placeholder="Select or search..."
        searchMode
        error={state.listId.error}
        multiSelect
      />
      <Input
        type="text"
        onChange={(e) => handleFieldValue("title", e.currentTarget.value)}
        value={state.title.value}
        error={state.title.error}
        style={{
          fontSize: "2rem",
        }}
      />
      <Textarea
        onChange={(e) => handleFieldValue("text", e.currentTarget.value)}
        value={state.text.value}
        error={state.text.error}
        style={{
          fontSize: "1.5rem",
        }}
      />
    </Form>
  );
};
