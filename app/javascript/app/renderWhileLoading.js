import { branch, renderComponent } from 'recompose';
import Loader from "./components/Loader";

export default function renderWhenLoading() {
    return branch(
        props => props.data && props.data.loading,
        renderComponent(Loader)
    );
}