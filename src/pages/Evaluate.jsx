import styled from "styled-components";
import EvaluateRow from "../components/Evaluate/EvaluateRow";
import EvaluateHeader from "../components/Evaluate/EvaluateHeader";
import EvaluateSubHeader from "../components/Evaluate/EvaluateSubHeader";
import EvaluateComment from "../components/Evaluate/EvaluateComment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { evaluationOptions } from "../utils/commonData";
import { doEvaluate, getTeamMembers, updateEvaluationState } from "../features/userSlice";
import { useEffect } from "react";
import Loading from "../components/Loading";

const rowSchema = yup.string("choose a principle").required("cann't be empty");

const validationSchema = yup.object({
    ticket: yup.string("Enter the ticket").required("ticket is required"),
    type: yup.string("Enter ticket type").required("type is required"),
    agent: yup.string("Enter the agent").required("agent is required"),
    score: yup.number("Enter the score").required("score is required"),
    conversationFlow: rowSchema,
    softSkills: rowSchema,
    calrityOfCommunication: rowSchema,
    ownership: rowSchema,
    solution: rowSchema,
    proceduresAndTools: rowSchema,
    understanding: rowSchema,
    behaviourWithCustomer: rowSchema,
    wrongInformation: rowSchema,
    dataCompliance: rowSchema,
    denigrates: rowSchema,
    comment: yup.string("write a comment").required("cann't be empty"),
});

export default function Evaluate() {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.userSlice);

    const formik = useFormik({
        initialValues: {
            ticket: "",
            type: "",
            agent: "",
            score: null,
            //
            conversationFlow: "",
            softSkills: "",
            calrityOfCommunication: "",
            ownership: "",
            solution: "",
            proceduresAndTools: "",
            understanding: "",
            behaviourWithCustomer: "",
            wrongInformation: "",
            dataCompliance: "",
            denigrates: "",
            //
            comment: "",
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            dispatch(updateEvaluationState(values));
            dispatch(doEvaluate({ token: localStorage.getItem("token"), data: values }));
        },
    });

    useEffect(() => {
        dispatch(getTeamMembers({ token: localStorage.getItem("token") }));
    }, [dispatch]);


    return (
        <Wrapper onSubmit={formik.handleSubmit}>
            {/* header */}
            <EvaluateHeader />

            <br />

            {/* ! sub header */}
            <EvaluateSubHeader formik={formik} />

            {/* ! eva details */}
            {evaluationOptions.map((op, index) => {
                return (
                    <EvaluateRow
                        op={op}
                        key={index}
                        formik={formik}
                    />
                );
            })}

            <br />
            <br />

            {/*! comment */}
            <EvaluateComment formik={formik} />
        </Wrapper>
    );
}

const Wrapper = styled.form`
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 2px solid #3eedbf;
        padding-bottom: 20px;
    }
`;
