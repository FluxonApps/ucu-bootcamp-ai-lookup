import ResultCard from './ResultCard';
import '../index.css';
import { MainResult } from './imageProcessing';

// const testCardProps: CardProps = {
//   url: 'https://www.2ndstreet.jp/goods/detail/goodsId/2334532349329/shopsId/31056',
//   price: 27500,
//   currency: 'jpy',
//   name_of_website: 'www.2ndstreet.jp',
//   image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqiPFf61RrymohGUy50RB_Du3L8Vcbf1whFfPdJquPq3HeQkx9',
//   title:
//     'その他ブランド(ソノタブランド) / SEXTON/コーデュロイスタジャン/XL/コットン/BRD/無地/カナダ製 | 古着の販売・通販ならセカンドストリート',
// };

export default function ResultGrid(data: MainResult) {
  const results = data.similarListings;
  return (
    <div className="flex w-full px-2 justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 h-full max-w-250 overflow-hidden">
        <div>result</div>
        <div>result</div>
        <div>result</div>
        <div>result</div>
        {results.map((result) => {
          return <ResultCard {...result} />;
        })}
        {/* <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} />
        <ResultCard {...testCardProps} /> */}
      </div>
    </div>
  );
}
