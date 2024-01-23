import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Select } from "../BaseComponents/Select/Select";
import { Textarea } from "../BaseComponents/Textarea/Textarea";
import { Button } from "../BaseComponents/Button/Button";
import { useEffect } from "react";
import { useNoteForm } from "@/hooks/useNoteForm";
import { useRouter } from "next/router";
import { MultiSelect } from "../BaseComponents/MultiSelect/MultiSelect";
import { IoClose } from "react-icons/io5";

type FormData = {
  title: string;
  text: string;
  listId: string;
  sharedWith: string[];
};

type FormProps = {
  initialData?: FormData & { id: string };
};

export const AddNoteForm = (props: FormProps) => {
  const router = useRouter();
  const { initialData } = props;

  const {
    state,
    handleInitialState,
    handleFieldValue,
    handleSubmit,
    listSelectOptions,
    userSelectOptions,
  } = useNoteForm();

  useEffect(() => {
    if (initialData) {
      handleInitialState({
        ...initialData,
        errors: { title: false, text: false, listId: false },
      });
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
          onClick={() => router.back()}
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
            onChange={(e) => handleFieldValue("title", e.currentTarget.value)}
            value={state.title}
            error={state.errors.title}
            style={{
              fontSize: "2rem",
            }}
          />
          <Textarea
            onChange={(e) => handleFieldValue("text", e.currentTarget.value)}
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
              onChange={(opt) => handleFieldValue("listId", opt?.value)}
            />
          )}
          {userSelectOptions && (
            <MultiSelect
              options={userSelectOptions}
              initialSelectedOptions={initialData?.sharedWith}
              placeholder="Udostępnij innym..."
              onChange={(array) =>
                handleFieldValue(
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
