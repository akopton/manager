import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Select } from "../BaseComponents/Select/Select";
import { Textarea } from "../BaseComponents/Textarea/Textarea";
import { Button } from "../BaseComponents/Button/Button";
import { useRouter } from "next/router";
import { MultiSelect } from "../BaseComponents/MultiSelect/MultiSelect";
import { IoClose } from "react-icons/io5";
import { ValidationConfig, useForm } from "@/hooks/useForm";
import { api } from "@/utils/api";
import { mapObjToOption } from "@/utils/mapObjToOption";
import { useEffect } from "react";

type FormData = {
  title: string;
  text: string;
  listId: string;
  sharedWith: string[];
};

type FormProps = {
  initialData?: FormData & { id: string };
};

type FormState = {
  title: string;
  text: string;
  listId: string;
  sharedWith: string[];
  errors: {
    title: boolean;
    text: boolean;
    listId: boolean;
  };
};

const initialState: FormState = {
  title: "",
  text: "",
  listId: "",
  sharedWith: [],
  errors: {
    title: false,
    text: false,
    listId: false,
  },
};

const validationConfig: ValidationConfig<FormState> = {
  title: { required: true },
  text: { required: true },
  listId: { required: true },
};

export const AddNoteForm = (props: FormProps) => {
  const { state, handleValue, onSubmit, handleInitialData } =
    useForm<FormState>(initialState);
  const { back } = useRouter();
  const { initialData } = props;
  const refetchNotes = api.notesList.getLists.useQuery().refetch;
  const { mutateAsync: saveNote } = api.notes.saveNote.useMutation();
  const { data: users } = api.user.getUsers.useQuery();
  const { data: lists } = api.notesList.getLists.useQuery();
  const userSelectOptions = users?.map(mapObjToOption);
  const listSelectOptions = lists?.map(mapObjToOption);

  const save = async () => {
    await saveNote({ ...state });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    await onSubmit(e, save, validationConfig);
    await refetchNotes();
    back();
  };

  useEffect(() => {
    if (initialData) {
      handleInitialData(initialData);
    }
  }, [initialData]);

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        height: "100%",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className="flex w-full items-center justify-end">
        <Button
          type="button"
          icon={<IoClose />}
          onClick={() => back()}
          style={{
            fontSize: "2rem",
            border: "none",
          }}
        />
      </div>
      <div className="grid h-full w-full grid-cols-3 gap-5 px-10">
        <div className="col-span-2 grid grid-rows-3">
          <Input
            type="text"
            onChange={(e) => handleValue("title", e.currentTarget.value)}
            value={state.title}
            error={state.errors.title}
            style={{
              fontSize: "2rem",
            }}
          />
          <Textarea
            onChange={(e) => handleValue("text", e.currentTarget.value)}
            value={state.text}
            error={state.errors.text}
            style={{
              fontSize: "1.5rem",
              border: "2px solid var(--light-blue)",
              gridRow: "2/4",
            }}
          />
        </div>
        <div className="grid grid-rows-3">
          {listSelectOptions && (
            <Select
              options={listSelectOptions}
              value={state.listId}
              onChange={(opt) => handleValue("listId", opt?.value)}
            />
          )}
          {userSelectOptions && (
            <MultiSelect
              options={userSelectOptions}
              initialSelectedOptions={initialData?.sharedWith}
              placeholder="Udostępnij innym..."
              onChange={(array) =>
                handleValue(
                  "sharedWith",
                  array.map((el) => el.value),
                )
              }
            />
          )}
        </div>
      </div>
      <Button
        type="submit"
        text="Zapisz"
        onClick={handleSubmit}
        style={{
          fontSize: "1.5rem",
        }}
      />
    </Form>
  );
};
