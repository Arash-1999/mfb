interface FormItem {
  type: string;
  [key: string]: unknown;
}
type onSubmitFn = (newItem: FormItem) => void;
interface WithSubmitInjectedProps {
  onSubmit: onSubmitFn;
}
export type { FormItem, WithSubmitInjectedProps, onSubmitFn };
