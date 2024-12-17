import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from '@mui/material';
import { filterInputNumber, toastWarning } from 'src/Logic';
import { PostApi } from 'src/Api';

interface DialogEditProps {
  setOpen: any;
  open: any;
  getData: any;
  profile: any;
}
const DialogEdit: React.FC<DialogEditProps> = (props) => {
  const { open, setOpen, getData, profile } = props;
  const [profileName, setProfileName] = useState<String>('');
  const [sessionPerUser, setSessionPerUser] = useState<Number | undefined>(
    undefined
  );
  const [connectTime, setConnectTime] = useState<Number | undefined>(undefined);
  const [idleTime, setIdleTime] = useState<Number | undefined>(undefined);
  const handleEdit = async () => {
    if (profileName == '' || !sessionPerUser || !connectTime || !idleTime) {
      toastWarning('Please enter input');
      return;
    }
    // const res = await PostApi()
    handleClose();
    getData();
    setProfileName('');
    setConnectTime(undefined);
    setIdleTime(undefined);
    setSessionPerUser(undefined);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (profile) {
      setProfileName(profile.profileName);
      //   setSessionPerUser(profile.profileName);
      //   setConnectTime(profile.profileName);
      //   setIdleTime(profile.profileName);
    }
  }, [profile]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="p-6">
            <div className="flex items-center grid grid-cols-4">
              <div className="font-bold pr-3 col-span-1">Profile Name:</div>

              <Input
                className="col-span-3"
                value={profileName}
                placeholder="profile name"
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center grid grid-cols-4">
              <div className="font-bold pr-3 col-span-1">Session Per User:</div>
              <Input
                className="col-span-3"
                value={sessionPerUser}
                placeholder="session per user"
                onChange={(e) =>
                  filterInputNumber(e.target.value, setSessionPerUser)
                }
              />
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center grid grid-cols-4">
              <div className="font-bold pr-3 col-span-1">Connect Time:</div>
              <Input
                className="col-span-3"
                value={connectTime}
                placeholder="connect time"
                onChange={(e) =>
                  filterInputNumber(e.target.value, setConnectTime)
                }
              />
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center grid grid-cols-4">
              <div className="font-bold pr-3 col-span-1">Idle Time:</div>
              <Input
                className="col-span-3"
                value={idleTime}
                placeholder="idle time"
                onChange={(e) => filterInputNumber(e.target.value, setIdleTime)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleEdit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogEdit;
