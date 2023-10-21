import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
const initialValue = {
  thirdColorLevel: 7,
  selectedHexValue: "777",
};

const ThirdColorContext = createContext<
  [
    state: ColorContextType,
    setState: Dispatch<SetStateAction<ColorContextType>>,
    isDefault: boolean,
    setIsDefault: Dispatch<SetStateAction<boolean>>
  ]
>([initialValue, () => {}, true, () => {}]);

// The Red varies with the Y axis of color picker, Green varies with the X axis, and I have a slider
// component that changes the blue value of all the squares in the grid as it goes up and down.
// This context is all about blue: the "Third Color"
type ColorContextType = {
  thirdColorLevel: number;
  selectedHexValue: string;
};

const ThirdColorProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ColorContextType>({
    thirdColorLevel: 7,
    selectedHexValue: "777",
  });
  const [isDefault, setIsDefault] = useState(true);
  return (
    <ThirdColorContext.Provider
      value={[state, setState, isDefault, setIsDefault]}
    >
      {children}
    </ThirdColorContext.Provider>
  );
};

export { ThirdColorContext, ThirdColorProvider };
