import { Alert, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { signIn } from "../features/userSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const userValues = {
    email: { email: "", valid: null },
    password: { password: "", valid: null },
};

export default function Login() {
    const [user, setUser] = useState(userValues);
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading, isError, errorMsg, isLogged } = useSelector((state) => state.userSlice);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        if (e.target.type === "email") setUser((us) => ({ ...us, email: { email: e.target.value } }));

        if (e.target.type === "password") setUser((us) => ({ ...us, password: { password: e.target.value } }));
    };

    const handleSumbit = (e) => {
        e.preventDefault();

        if (!user.email.email || !user?.email?.email?.endsWith("arqaam.com")) {
            console.log("email not valid");
            setUser((us) => ({ ...us, ...us.email, email: { valid: false } }));
            return;
        }

        if (user?.password?.password?.length < 3 || !user.password.password) {
            console.log("password not valid");
            setUser((us) => ({ ...us, ...us.password, password: { valid: false } }));
            return;
        }

        setUser((us) => ({
            email: { email: us.email.email, valid: true },
            password: { password: us.password.password, valid: true },
        }));

        dispatch(signIn({ email: user.email.email, password: user.password.password }));
    };

    useEffect(() => {
        if (isLogged) {
            navigate("/");
        }
    }, [isLogged, navigate]);

    return (
        <Wrapper
            onChange={handleChange}
            onSubmit={handleSumbit}>
            <h2>Login</h2>
            <FormControl variant="standard">
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    type="email"
                    error={user.email.valid === false ? true : false}
                    helperText={user.email.valid === false ? "email couldn't be like this" : null}
                />
                {/* {!user.email.valid || <Alert severity="error">no</Alert>} */}
            </FormControl>

            <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    error={user.password.valid === false ? true : false}
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <Button
                variant="outlined"
                type="submit"
                disabled={isLoading ? true : false}>
                {isLoading ? "loading" : "Login"}
            </Button>
            {isError && <Alert severity="error">{errorMsg}</Alert>}
        </Wrapper>
    );
}

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 500px;
    padding: 40px 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
