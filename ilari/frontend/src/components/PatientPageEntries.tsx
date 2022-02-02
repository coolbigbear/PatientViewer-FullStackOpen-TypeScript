import React from 'react';
import { Header } from 'semantic-ui-react';
import { Entry, EntryTypes } from '../types';
import { assertNever } from '../utils/util';
import { HealthCheckCard } from './HealthCheckCard';
import { HospitalCard } from './HospitalCard';
import { OccupationalHealthcareCard } from './OccupationalHealthcareCard';

export const PatientPageEntries = ({ entries }: { entries: Entry[] }) => {
	console.log(entries);

	if (!entries || entries.length == 0) return null;

	return (
		<div>
			<div>
				<Header as="h3">Entries</Header>
			</div>
			{entries &&
				entries.map((entry) => {
					switch (entry.type) {
						case EntryTypes.HEALTH_CHECK:
							return <HealthCheckCard key={entry.id} entry={entry} />;
						case EntryTypes.HOSPITAL:
							return <HospitalCard key={entry.id} entry={entry} />;
						case EntryTypes.OCCUPATIONAL_HEALTHCARE:
							return <OccupationalHealthcareCard key={entry.id} entry={entry} />;
						default:
							return assertNever(entry);
					}
				})}
		</div>
	);
};
