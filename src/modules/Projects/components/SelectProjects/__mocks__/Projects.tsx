import { DetailedHTMLFactory, forwardRef, SelectHTMLAttributes } from "react";
import { ProjectComponentProps } from "../types";

interface MockedStatusComponentProps extends ProjectComponentProps, DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

const Projects = forwardRef(({ id, projectId, project, onSelectCallback }: MockedStatusComponentProps, ref: React.LegacyRef<HTMLSelectElement>) => {
    return (
        <select defaultValue="choose" data-testid='projects-select-options' onChange={onSelectCallback} ref={ref}>
            <option value="choose" >Wybierz projekt</option>
            <option value="1">Projekt 1</option>
            <option value="2">Projekt 2</option>
        </select>
    )
})

export { Projects };