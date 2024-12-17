import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from 'src/components/ComponentLogin';
import { toastWarning } from 'src/Logic';

const valueCheckBox = [
  { name: 'CREATE PROFILE', check: false },
  { name: 'ALTER PROFILE', check: false },
  { name: 'DROP PROFILE', check: false },
  { name: 'ALTER ANY ROLE', check: false },
  { name: 'DROP ANY ROLE', check: false },
  { name: 'GRANT ANY ROLE', check: false },
  { name: 'CREATE SESSION', check: false },
  { name: 'CREATE ANY TABLE', check: false },
  { name: 'ALTER ANY TABLE', check: false },
  { name: 'DROP ANY TABLE', check: false },
  { name: 'SELECT ANY TABLE', check: false },
  { name: 'DELETE ANY TABLE', check: false },
  { name: 'INSERT ANY TABLE', check: false },
  { name: 'UPDATE ANY TABLE', check: false },
  { name: 'CREATE TABLE', check: false },
  { name: 'CREATE USER', check: false },
  { name: 'ALTER USER', check: false },
  { name: 'DROP USER', check: false }
];

const PannelSystem: React.FC<any> = (props) => {
  const [valueInput, setValueInput] = useState<string>('');
  const [listValueCheckBox, setListValueCheckBox] =
    useState<any>(valueCheckBox);

  const handleSubmit = async () => {
    if (valueInput == '') {
      toastWarning('Please enter input');
      return;
    }
    console.log('Submitted values:', listValueCheckBox);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const newList = listValueCheckBox.map((item: any) => {
      if (item.name === name) {
        return { ...item, check: event.target.checked };
      }
      return item;
    });

    setListValueCheckBox(newList);
  };

  return (
    <>
      <div className="pl-6">
        <TextField
          placeholder="username or role"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
      </div>

      <Card className="mt-6" sx={{ minWidth: 275 }}>
        <CardContent>
          <FormGroup>
            <div className="grid grid-cols-4">
              {listValueCheckBox.map((item, index) => (
                <div key={index} className="col-span-1">
                  <FormControlLabel
                    style={{ display: 'block' }}
                    control={
                      <Checkbox
                        onChange={(e) => handleChange(e, item.name)}
                        checked={item.check}
                      />
                    }
                    label={item.name}
                  />
                </div>
              ))}
            </div>
          </FormGroup>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="mt-6">
          Submit
        </Button>
      </div>
    </>
  );
};

export default PannelSystem;
