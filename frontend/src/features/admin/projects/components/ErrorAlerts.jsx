/* eslint-disable react/prop-types */
import { Alert } from "@mui/material";

const ErrorAlerts = ({ errors }) => {
  return (
    <>
      {errors && errors.submit && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.submit}
        </Alert>
      )}
      {errors && errors.descriptions && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.descriptions}
        </Alert>
      )}
    </>
  );
};

export default ErrorAlerts;
