import Swal from 'sweetalert2';

export const Alert = (handleBack: any, title: string) => {
  Swal.fire({
    title: title,
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `No`
  }).then((result: any) => {
    if (result.isConfirmed) {
      handleBack();
    } else if (result.isDenied) {
    }
  });
};

export const AlertDeleteProfileName = (
  handleBack: any,
  title: string,
  profileName
) => {
  Swal.fire({
    title: title,
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `No`
  }).then((result: any) => {
    if (result.isConfirmed) {
      handleBack(profileName);
    } else if (result.isDenied) {
    }
  });
};
