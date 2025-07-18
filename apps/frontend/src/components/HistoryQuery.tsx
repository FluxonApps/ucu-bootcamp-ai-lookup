import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase.config.ts';
import ResultGrid from "../components/ResultGrid.tsx";

export type HistoryQueryType = {
	queryId: string;
};

export function HistoryQuery({ queryId }: HistoryQueryType) {
	const queryDoc = doc(db, "queries", queryId);
	const [queryData] = useDocument(queryDoc);
	
	return (
		<div className={"h-screen grow duration-300 w-[100%]"}>
			<ResultGrid data={queryData?.data()?.obtainedData}></ResultGrid>
		</div>
	);
}
