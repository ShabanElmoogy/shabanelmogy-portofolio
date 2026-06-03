/* eslint-disable react/prop-types */
import { Autocomplete, TextField, Box } from "@mui/material";

const FilterAutocomplete = ({
  label,
  placeholder,
  color = "primary",
  value,
  options = [],
  onChange,
  clearText = "Clear",
  noOptionsText = "No options",
}) => {
  return (
    <Autocomplete
      value={value === "all" ? null : { name: value }}
      onChange={(event, newValue) => {
        onChange?.(newValue ? newValue.name : "all");
      }}
      options={[...options]}
      getOptionLabel={(option) => option?.name || ""}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ "@media (min-width:900px) and (max-width:1100px)": { fontSize: '0.70rem' } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: (theme) =>
                  theme.palette[color]?.main || theme.palette.primary.main,
              }}
            />
            {option.name}
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": {
                borderColor: (theme) =>
                  theme.palette[color]?.main || theme.palette.primary.main,
                borderWidth: 2,
              },
              "&:hover fieldset": {
                borderColor: (theme) =>
                  theme.palette[color]?.main || theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: (theme) =>
                  theme.palette[color]?.main || theme.palette.primary.main,
              },
            },
            "& .MuiInputBase-input": {
              "@media (min-width:900px) and (max-width:1100px)": {
                fontSize: '0.85rem',
              },
            },
            "& .MuiInputLabel-root": {
              color: (theme) =>
                theme.palette[color]?.main || theme.palette.primary.main,
              fontWeight: 600,
              "@media (min-width:900px) and (max-width:1100px)": {
                fontSize: '0.75rem',
              },
              "&.MuiInputLabel-shrink": {
                "@media (min-width:900px) and (max-width:1100px)": {
                  fontSize: '0.9rem',
                },
              },
              "&.Mui-focused": {
                color: (theme) =>
                  theme.palette[color]?.main || theme.palette.primary.main,
              },
            },
          }}
        />
      )}
      sx={{ width: "100%" }}
      clearOnEscape
      clearText={clearText}
      noOptionsText={noOptionsText}
    />
  );
};

export default FilterAutocomplete;
