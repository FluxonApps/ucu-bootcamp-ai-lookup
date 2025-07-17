import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase.config.ts';

export function HistoryQuery({ queryId }) {
  const queryDoc = doc(db, "queries", queryId);
  const [queryData] = useDocument(queryDoc);

  return (
    <div className={"h-screen grow duration-300 w-[100%]"}>
      <div>
        History query data page {queryData && queryData.data()?.timestamp}
      </div>
    </div>
  );
}
