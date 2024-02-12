/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import { TextField } from "@mui/material";

export default function EvaluateComment({ formik }) {
    return (
        <TextField
            multiline={true}
            rows={4}
            autoComplete="off"
            id="outlined-basic"
            label="Over All Comment"
            variant="outlined"
            name="comment"
            onChange={formik.handleChange}
            value={formik.values.comment}
            onBlur={formik.handleBlur}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            // helperText={formik.touched.comment && formik.errors.comment}
            sx={{ height: "500px" }}
            style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
            }}></TextField>
    );
}
