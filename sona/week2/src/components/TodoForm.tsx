import Button from "./Button";

interface TodoFormProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function TodoForm({
  input,
  handleSubmit,
  setInput,
}: TodoFormProps) {
  return (
    <form
      id="todo-form"
      className="todo-container__form"
      onSubmit={handleSubmit}
    >
      <input
        value={input}
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
        onChange={(e) => setInput(e.target.value)}
      />
      <Button color="green">할일추가</Button>
    </form>
  );
}
