import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

export const OccupationalHealthcareCard = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
	return (
		<div key={entry.id}>
			<Card>
				<Card.Content>
					<Card.Header>
						{entry.date}
						<Icon name="stethoscope"></Icon>
					</Card.Header>
					<Card.Content>{entry.description}</Card.Content>
                </Card.Content>
                {entry.diagnosisCodes &&
                    <Card.Content>
                        <List bulleted items={entry.diagnosisCodes} />
                    </Card.Content>
                }
			</Card>
		</div>
	);
};
