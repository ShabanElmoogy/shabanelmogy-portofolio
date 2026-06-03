/* eslint-disable react/prop-types */
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

/**
 * @param {Object} props
 * @param {'text'|'select'|string} [props.type]
 * @param {any} props.label
 * @param {any} props.name
 * @param {any} props.value
 * @param {(e:any)=>void} props.onChange
 * @param {boolean} [props.required]
 * @param {boolean} [props.fullWidth]
 * @param {'none'|'normal'|'dense'} [props.margin]
 * @param {boolean} [props.error]
 * @param {string} [props.helperText]
 * @param {{value:any,label:any}[]} [props.options]
 * @param {boolean} [props.multiple]
 * @param {(selected:any)=>any} [props.renderValue]
 * @param {any} [props.children]
 */
const FormField = ({ 
  type = 'text',
  label,
  name,
  value,
  onChange,
  required = false,
  fullWidth = true,
  margin = 'normal',
  error = false,
  helperText = '',
  options = [], // For select fields
  multiple = false, // For multi-select
  renderValue = undefined, // Custom render for multi-select
  children = undefined, // For custom content in select
  ...props
}) => {
  const theme = useTheme();

  const baseStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      background: alpha(theme.palette.background.paper, 0.8),
      transition: 'all 0.3s ease',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
      },
      '&:hover': {
        background: alpha(theme.palette.background.paper, 0.9),
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
      },
      '&.Mui-focused': {
        background: theme.palette.background.paper,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        },
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.error.main,
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontWeight: 500,
      color: theme.palette.text.secondary,
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
    },
    '& .MuiFormHelperText-root': {
      color: theme.palette.text.secondary,
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },
  };

  const selectStyles = {
    ...baseStyles,
    '& .MuiSelect-select': {
      color: theme.palette.text.primary,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.text.secondary,
    },
  };

  if (type === 'select') {
    return (
      <FormControl 
        fullWidth={fullWidth} 
        margin={/** @type {'none'|'normal'|'dense'} */ (margin)} 
        error={error}
        sx={selectStyles}
      >
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          required={required}
          multiple={multiple}
          input={multiple ? <OutlinedInput label={label} /> : undefined}
          renderValue={renderValue}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: theme.palette.background.paper,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                '& .MuiMenuItem-root': {
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '&.Mui-selected': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.18),
                    },
                  },
                },
              },
            },
          }}
          {...props}
        >
          {children || options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <TextField
      margin={/** @type {'none'|'normal'|'dense'} */ (margin)}
      fullWidth={fullWidth}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
      helperText={helperText}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      sx={baseStyles}
      {...props}
    />
  );
};

export default FormField;
