import React from 'react';
import { CoursePart } from '../types';
import { Part } from './Part';

export const Content = ({ courseParts }: {courseParts: CoursePart[]}): JSX.Element => {
	return (
		<div>
			{courseParts.map((course: CoursePart) => (
				<p key={course.name}>
					<Part part={course}/>
				</p>
			))}
		</div>
	);
};
