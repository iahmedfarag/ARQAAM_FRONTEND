import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addNumbersToTeam } from "../../features/teamNumbersSlice";
import dayjs from "dayjs";

export default function UploadBTN() {
    const { activeDate, isLoading } = useSelector((state) => state.teamNumbersSlice);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const roader = new FileReader();
        roader.readAsBinaryString(e.target.files[0]);
        roader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            if (activeDate > dayjs()) return alert("you are updating future numbers smart!");
            console.log(parsedData);
            dispatch(
                addNumbersToTeam({
                    token: localStorage.getItem("token"),
                    date: activeDate,
                    teamNumbers: parsedData,
                })
            );
        };
    };

    // ! TODO -- make onchange ond ate and the input
    return (
        <Button
            variant="contained"
            style={{ padding: 0 }}>
            {isLoading ? (
                <p style={{ padding: "8px 16px" }}>loading..</p>
            ) : (
                <>
                    <label
                        htmlFor="fileUpload"
                        style={{ padding: "8px 16px", cursor: "pointer" }}>
                        Upload
                    </label>
                    <input
                        id="fileUpload"
                        type="file"
                        accept=".xls, .xlsx"
                        style={{ display: "none" }}
                        onClick={(e) => (e.target.value = "")}
                        onChange={handleChange}
                    />
                </>
            )}
        </Button>
    );
}
