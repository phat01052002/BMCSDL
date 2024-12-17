import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from 'src/components/ComponentLogin';
const valueCheckBox = [
  { name: 'SELECT', check: false },
  { name: 'INSERT', check: false },
  { name: 'DELETE', check: false }
];

const PannelObject: React.FC<any> = (props) => {
  const [valueInput, setValueInput] = useState<String>('');
  const [listValueCheckBox, setListValueCheckBox] =
    useState<any>(valueCheckBox);
  const handleSubmit = async () => {
    console.log('Submitted values:', listValueCheckBox);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: String
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
              <div className="col-span-1">
                <FormControlLabel
                  style={{ display: 'block' }}
                  control={
                    <Checkbox
                      onChange={(e: any) =>
                        handleChange(e, listValueCheckBox[0].name)
                      }
                      checked={listValueCheckBox[0].check ? true : false}
                    />
                  }
                  label={listValueCheckBox[0].name}
                />
                <FormControlLabel
                  style={{ display: 'block' }}
                  control={
                    <Checkbox
                      onChange={(e: any) =>
                        handleChange(e, listValueCheckBox[1].name)
                      }
                      checked={listValueCheckBox[1].check ? true : false}
                    />
                  }
                  label={listValueCheckBox[1].name}
                />
                <FormControlLabel
                  style={{ display: 'block' }}
                  control={
                    <Checkbox
                      onChange={(e: any) =>
                        handleChange(e, listValueCheckBox[2].name)
                      }
                      checked={listValueCheckBox[2].check ? true : false}
                    />
                  }
                  label={listValueCheckBox[2].name}
                />
              </div>
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

export default PannelObject;
