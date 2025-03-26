interface ButtonProps {
  color: string;
  children: string;
  onClick?: () => void;
}

export default function Button({ color, children, onClick }: ButtonProps) {
  return (
    <button
      className="render-container__item-button"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
