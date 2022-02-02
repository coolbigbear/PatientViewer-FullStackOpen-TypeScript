import React from "react"
import { CoursePart } from "../types"

export const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return <p>Total: {courseParts.length}</p>
}