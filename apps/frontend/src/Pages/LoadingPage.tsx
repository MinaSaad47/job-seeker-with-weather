import Spinner from "../components/Spinner";

const LoadingPage = () => {
  return (
    <div className="sticky h-screen w-screen flex items-center justify-center text-6xl">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
