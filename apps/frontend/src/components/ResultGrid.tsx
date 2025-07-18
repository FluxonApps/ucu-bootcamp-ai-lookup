import ResultCard from './ResultCard';
import '../index.css';
import { MainResult } from './imageProcessing';
type ResultGridProps = {
  data: MainResult;
};

export default function ResultGrid({ data }: ResultGridProps) {
  if (!data?.similarListings) {
    return <div>No data</div>;
  }
  const results = data.similarListings;
  return (
    <div className="flex w-full px-2 justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 h-full max-w-250 overflow-hidden">
        {results.map((result) => {
          return <ResultCard {...result} />;
        })}
      </div>
    </div>
  );
}
