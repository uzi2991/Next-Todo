import Spinner from './Spinner';

const Loading = () => {
  return (
    <div className="full-page">
      <div className="flex flex-col gap-4 items-center">
        <Spinner />
        <h1 className="text-2xl">Loading</h1>
      </div>
    </div>
  );
};

export default Loading;
