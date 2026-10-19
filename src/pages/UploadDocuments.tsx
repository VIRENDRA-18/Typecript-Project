
import StepIndicator from "../components/StepIndicator";
import ArrowIcon from "../components/ArrowIcon";
import FileUpload from "../components/FileUpload";
import { useOnboarding } from "../context/OnboardingContext";

type UploadDocumentsProps = {
  onBack: () => void;
  onNext: () => void;
};

function UploadDocuments({ onBack, onNext }: UploadDocumentsProps) {
  const { state, dispatch } = useOnboarding();
  const files = state.files;

  function handleFilesChange(updatedFiles: File[]) {
    dispatch({
      type: "SET_FILES",
      payload: updatedFiles,
    });
  }

  function handleSubmit() {
    onNext();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6 sm:px-6 lg:p-8">
      <div className="w-full max-w-3xl rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8">

        
        <StepIndicator currentStep={3} />

        
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-blue-950">
            Upload your documents
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Securely upload the required documents.
          </p>
        </div>

        
        <div className="mt-6">
          <FileUpload
            label="Upload Documents"
            files={files}
            onChange={handleFilesChange}
          />
        </div>

        
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowIcon direction="left" />
            Back
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Next
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocuments;
