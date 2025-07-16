export const Dropbox = ({
  idName,
  index,
}: {
  idName: string;
  index: number;
}) => {
  return <div id={idName} data-index={index} className="dropbox"></div>;
};
