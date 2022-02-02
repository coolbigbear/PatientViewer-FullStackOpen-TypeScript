import React from "react"
import { CoursePart } from "../types"

export const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {

    let sum = 0;

    courseParts.forEach(element => {
        sum += element.exerciseCount
    });

    return <p>Total: {sum}</p>
}