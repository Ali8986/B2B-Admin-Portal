import { TextField } from "@mui/material";

const FormInput = ({
  label,
  name,
  type,
  value,
  variant = "outlined",
  onChange,
  required = true,
  multline,
  InputProps,
  sx,
}) => {
  const autoComplete = type === "password" ? "current-password" : "on";
  return (
    <TextField
      className={`my-2`}
      multiline={multline}
      rows={3}
      type={type}
      variant={variant}
      label={label}
      name={name}
      fullWidth
      value={value}
      InputProps={InputProps}
      required={required}
      onChange={onChange}
      autoComplete={autoComplete}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            color: sx ? "grey" : "#016699",
            borderColor: sx ? "gray" : "#016699", // Desired border color
          },
        },
        input: sx && {
          fontSize: "1rem",
        },
        label: {
          color: sx ? "" : "#016699",
        },
      }}
    />
  );
};

export default FormInput;
