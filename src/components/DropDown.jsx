import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const DropDown = ({ label, value, onChange, items }) => {
  return (
    <FormControl fullWidth height="50px">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={value}
        onChange={onChange}
      >
        {items.map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
