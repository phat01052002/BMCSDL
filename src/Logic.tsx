import { toast } from 'react-toastify';

export const toastError = (text: string) => {
  toast.error(text, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: false,
    closeOnClick: true
  });
};
export const toastSuccess = (text: string) => {
  toast.success(text, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: false,
    closeOnClick: true
  });
};
export const toastInfo = (text: string) => {
  toast.info(text, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: false,
    closeOnClick: true
  });
};
export const toastWarning = (text: string) => {
  toast.warning(text, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: false,
    closeOnClick: true
  });
};

export const filterInputNumber = (value: any, setValue: any) => {
    value = value.replace(/[^0-9]/g, '');
    setValue(value);
};
