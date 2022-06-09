import React from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pageIndicator/pageIndicatorSlice";
import MainForm from "../../components/form/form.jsx";
import Page from "../../components/page/page.jsx";

export default function Form() {
  const dispatch = useDispatch();

  dispatch(setPage("calculate"));

  return (
    <Page>
      <MainForm />
    </Page>
  );
}
