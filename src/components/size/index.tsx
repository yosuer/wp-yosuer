import cx from "classnames";

interface Props {
  value: string;
  onSelect: () => void;
  active?: boolean;
}

const Size = ({ value, onSelect, active = false }: Props) => {
  return (
    <div
      key={value}
      className={cx(
        "rounded-md mx-1 w-[60px] h-[40px] border-solid border-2 border-gray flex justify-center items-center cursor-pointer",
        { "bg-gray-600 text-white": active },
        { "hover:bg-slate-100": !active }
      )}
      onClick={onSelect}
    >
      {value}
    </div>
  );
};

export default Size;
