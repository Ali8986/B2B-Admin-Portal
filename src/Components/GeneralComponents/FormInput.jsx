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
            color: sx ? "grey" : "#006599",
            borderColor: sx ? "gray" : "#006599", // Desired border color
          },
        },
        input: sx && {
          fontSize: "1rem",
        },
        label: {
          color: sx ? "" : "#006599",
        },
      }}
    />
  );
};

export default FormInput;
