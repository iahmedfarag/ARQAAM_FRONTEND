/* eslint-disable react/prop-types */

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function EvaluateRow({ op, formik }) {
    return (
        <FormControl
            sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${formik.errors[op.option] ? "red" : "#333"}` }}
            fullWidth={true}>
            <FormLabel
                id="demo-row-radio-buttons-group-label"
                style={{ fontSize: "18px", color: "#000" }}>
                {op.appears}
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name={op.option}
                onChange={formik.handleChange}>
                <FormControlLabel
                    label="Yes"
                    value="yes"
                    checked={(formik.values[op.option] === "yes" && true) || (formik.values[op.option] === "no" && false)}
                    control={
                        <Radio
                            sx={{ "&.Mui-checked": { color: "green" } }}
                            inputProps={{
                                "data-option": `${op.option}`,
                            }}
                        />
                    }
                />

                <FormControlLabel
                    label="No"
                    value="no"
                    checked={(formik.values[op.option] === "no" && true) || (formik.values[op.option] === "yes" && false)}
                    control={
                        <Radio
                            sx={{ "&.Mui-checked": { color: "red" } }}
                            inputProps={{
                                "data-option": `${op.option}`,
                            }}
                        />
                    }
                />

                {/* <IconButton
                    color="black"
                    aria-label="add an alarm">
                    <AlarmIcon />
                </IconButton> */}
            </RadioGroup>
        </FormControl>
    );
}
