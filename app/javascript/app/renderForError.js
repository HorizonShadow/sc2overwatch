import {branch} from "recompose";

export default function renderForError() {
    return branch(
        props => props.data && props.data.error,
        "Error"
    )
}