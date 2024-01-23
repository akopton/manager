import { useEventForm } from "@/hooks/useEventForm";
import { Form } from "../BaseComponents/Form/Form";

export const AddEventForm = () => {
  const {} = useEventForm();
  return <Form onSubmit={() => {}}></Form>;
};
