import { useEffect } from "react";
import { FluentProvider, webLightTheme, Toaster, Toast, ToastTitle, useToastController } from "@fluentui/react-components";
import AccountInformation from "./pages/AccountInformation";
import BusinessInformation from "./pages/BusinessInformation";
import ChoosePlan from "./pages/ChoosePlan";
import UploadDocuments from "./pages/UploadDocuments";
import Review from "./pages/Review";
import Success from "./pages/Success";
import OnboardingLayout from "./components/OnboardingLayout";

import { useOnboarding } from "./context/OnboardingContext";

import type { OnboardingState } from "./types";

function App() {
  const { state, dispatch, saveSubmission } = useOnboarding();
  const { dispatchToast } = useToastController("devflow-toaster");
  const step = state.step;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function goToStep(nextStep: OnboardingState["step"]) {
    dispatch({
      type: "SET_STEP",
      payload: nextStep,
    });
  }

  function handleSubmit() {
    saveSubmission();

    dispatchToast(
      <Toast>
        <ToastTitle>Onboarding submitted successfully!</ToastTitle>
      </Toast>,
      {
        intent: "success",
        timeout: 3000,
      },
    );

    goToStep(6);
  }

  function handleGoToDashboard() {
    dispatch({ type: "RESET" });
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <Toaster
        toasterId="devflow-toaster"
        position="top-end"
        pauseOnHover
      />

      {step >= 1 && step <= 5 && (
        <OnboardingLayout currentStep={step - 1}>
          {step === 1 && (
            <AccountInformation
              onNext={() => goToStep(2)}
            />
          )}

          {step === 2 && (
            <BusinessInformation
              onBack={() => goToStep(1)}
              onNext={() => goToStep(3)}
            />
          )}

          {step === 3 && (
            <ChoosePlan
              onBack={() => goToStep(2)}
              onNext={() => goToStep(4)}
            />
          )}

          {step === 4 && (
            <UploadDocuments
              onBack={() => goToStep(3)}
              onNext={() => goToStep(5)}
            />
          )}

          {step === 5 && (
            <Review
              onBack={() => goToStep(4)}
              onSubmit={handleSubmit}
              onEditAccount={() => goToStep(1)}
              onEditBusiness={() => goToStep(2)}
              onEditPlan={() => goToStep(3)}
              onEditDocuments={() => goToStep(4)}
            />
          )}
        </OnboardingLayout>
      )}

      {step === 6 && (
        <OnboardingLayout currentStep={4}>
          <Success onGoToDashboard={handleGoToDashboard} />
        </OnboardingLayout>
      )}
    </FluentProvider>
  );
}

export default App;
