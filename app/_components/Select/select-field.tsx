import cn from "@utils/cn";
import Icon from "../Icon";
import Select, { SelectProps } from "./select";
import TextLabel, { LabelProps } from "../Text/label";

const SelectField = ({
  title,
  caution,
  cautionClassName,
  options,
  defaultValue,
  ...props
}: SelectProps & LabelProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <TextLabel
          htmlFor={props.id}
          title={title}
          caution={caution}
          cautionClassName={cautionClassName}
        />
      )}
      <Select options={options} defaultValue={defaultValue} {...props} />
    </div>
  );
};

export default SelectField;
