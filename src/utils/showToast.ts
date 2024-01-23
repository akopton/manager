import { toast } from "react-toastify";

type Error = {
  type: "error";
  message: string;
};
type Promise = {
  type: "promise";
  func: () => globalThis.Promise<unknown>;
  successMessage: string;
  errorMessage: string;
  pendingMessage: string;
};
type Success = { type: "success"; message: string };

type ToastProps = Error | Promise | Success;

export const showToast = (props: ToastProps) => {
  const { type } = props;

  if (type === "success") {
    return toast.success(props.message);
  }
  if (type === "promise") {
    return toast.promise(props.func(), {
      pending: {
        render() {
          return props.pendingMessage;
        },
      },
      error: {
        render() {
          return props.errorMessage;
        },
      },
      success: {
        render() {
          return props.successMessage;
        },
      },
    });
  }
  if (type === "error") {
    return toast.error(props.message);
  }
};
