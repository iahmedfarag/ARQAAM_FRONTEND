import styled from "styled-components";
import EvaluateRow from "../components/Evaluate/EvaluateRow";
import EvaluateHeader from "../components/Evaluate/EvaluateHeader";
import EvaluateSubHeader from "../components/Evaluate/EvaluateSubHeader";
import EvaluateComment from "../components/Evaluate/EvaluateComment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { evaluationOptions } from "../utils/commonData";
import { getSingleEvaluate, getTeamMembers, updateEvluation } from "../features/userSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const rowSchema = yup.string("choose a principle").required("cann't be empty");

const validationSchema = yup.object({
    ticket: yup.string("Enter the ticket").required("ticket is required"),
    type: yup.string("Enter ticket type").required("type is required"),
    agent: yup.string("Enter the agent").required("agent is required"),
    score: yup.string("Enter the score").required("score is required"),
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

export default function UpdateEvaluation() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const { user, singleEvaluation, isLoading } = useSelector((state) => state.userSlice);
    const formik = useFormik({
        initialValues: {
            ticket: singleEvaluation?.details?.ticket || "",
            type: singleEvaluation?.details?.ticketType || "",
            agent: singleEvaluation?.to || "",
            score: singleEvaluation?.details?.score || "",
            //
            conversationFlow: singleEvaluation?.details?.conversationFlow || "",
            softSkills: singleEvaluation?.details?.conversationFlow || "",
            calrityOfCommunication: singleEvaluation?.details?.conversationFlow || "",
            ownership: singleEvaluation?.details?.ownership || "",
            solution: singleEvaluation?.details?.solution || "",
            proceduresAndTools: singleEvaluation?.details?.proceduresAndTools || "",
            understanding: singleEvaluation?.details?.understanding || "",
            behaviourWithCustomer: singleEvaluation?.details?.behaviourWithCustomer || "",
            wrongInformation: singleEvaluation?.details?.wrongInformation || "",
            dataCompliance: singleEvaluation?.details?.dataCompliance || "",
            denigrates: singleEvaluation?.details?.denigrates || "",
            //
            comment: singleEvaluation?.details?.comment || "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateEvluation({ token: localStorage.getItem("token"), id: params.id, date: params.date, ticket: values }));
            // dispatch(doEvaluate({ token: localStorage.getItem("token"), data: values }));
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (user.role === "agent") navigate("/");
        dispatch(getSingleEvaluate({ token: localStorage.getItem("token"), id: params.id, date: params.date }));
        dispatch(getTeamMembers({ token: localStorage.getItem("token") }));
    }, [dispatch, navigate, params, user.role]);

    if (!singleEvaluation) return;

    return (
        <Wrapper onSubmit={formik.handleSubmit}>
            {/* header */}
            <EvaluateHeader ticketDetails={true} />

            <br />

            {/* ! sub header */}
            <EvaluateSubHeader
                formik={formik}
                details={true}
            />

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
