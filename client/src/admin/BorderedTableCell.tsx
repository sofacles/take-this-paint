import { PropsWithChildren } from "react";
export interface BTDProps extends PropsWithChildren {
  title?: string;
}

const BTD = (props: BTDProps) => {
  const { title } = props;
  return (
    <td title={title} className="border px-4 py-2">
      {props.children}
    </td>
  );
};

export default BTD;
