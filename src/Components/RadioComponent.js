import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioComponent(props) {
  const [value, setValue] = React.useState("female");
  const { val1, val2, label } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        style={{ display: "flex", flexDirection: "row" }}
        aria-label={`${label}`}
        name={`${label}1`}
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={`${val1}`}
          control={<Radio />}
          label={`${val1}`}
        />
        <FormControlLabel
          value={`${val2}`}
          control={<Radio />}
          label={`${val2}`}
        />
      </RadioGroup>
    </FormControl>
  );
}
