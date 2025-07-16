export const Fillbox = ({
  idName,
  index,
}: {
  idName: string;
  index: number;
}) => {
  return (
    <input
      id={idName}
      data-index={index}
      className="fillbox"
      autoComplete="off"
    />
  );
};
