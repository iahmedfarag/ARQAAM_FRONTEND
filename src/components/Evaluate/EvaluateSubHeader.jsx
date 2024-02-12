/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

export default function EvaluateSubHeader({ formik, details, disable }) {
    const { teamMembers } = useSelector((state) => state.userSlice);

    return (
        <div className="head">
            {/* ticket */}
            <TextField
                id="outlined-basic"
                label="Ticket Link"
                variant="outlined"
                inputProps={{
                    "data-option": "ticket",
                }}
                name={"ticket"}
                value={formik.values.ticket}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.ticket && Boolean(formik.errors.ticket)}
                autoComplete="off"
                disabled={disable}
            />

            {/* type */}
            <Box sx={{ minWidth: 300 }}>
                <FormControl
                    fullWidth
                    disabled={disable}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        name={"type"}
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.type && Boolean(formik.errors.type)}>
                        <MenuItem value={"random"}>Random</MenuItem>
                        <MenuItem value={"dcsat"}>DCSAT</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* agent */}
            <Box sx={{ minWidth: 300 }}>
                <FormControl
                    fullWidth
                    disabled={disable}>
                    <InputLabel id="demo-simple-select-label">Agent</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Agent"
                        name={"agent"}
                        value={formik.values.agent}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.agent && Boolean(formik.errors.agent)}>
                        {teamMembers?.map((member, index) => {
                            if (details) {
                                if (formik.values.agent === member._id) {
                                    return (
                                        <MenuItem
                                            value={member._id}
                                            key={index}
                                            data-id={member._id}>
                                            {member.name}
                                        </MenuItem>
                                    );
                                }
                            } else {
                                return (
                                    <MenuItem
                                        value={member._id}
                                        key={index}
                                        data-id={member._id}>
                                        {member.name}
                                    </MenuItem>
                                );
                            }
                        })}
                    </Select>
                </FormControl>
            </Box>

            {/* score */}
            <TextField
                id="outlined-basic"
                label="Score"
                variant="outlined"
                type="number"
                name={"score"}
                value={formik.values.score}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.score && Boolean(formik.errors.score)}
                helperText={formik.touched.score && formik.errors.score}
                disabled={disable}
            />
        </div>
    );
}
