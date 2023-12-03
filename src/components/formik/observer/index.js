import { useFormikContext } from 'formik';
import { useEffect } from 'react';

const FormObserver = ({ onChange }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    onChange(values);
  }, [values]);

  return null;
};
export default FormObserver;
