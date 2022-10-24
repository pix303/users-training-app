import { FunctionComponent } from "react";

type ErrorMessageProps = {
    message: string;
    info?: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = (props: ErrorMessageProps) => {

    return (
        <div className="bg-red-200 border-l-8 border-red-600 rounded-md p-4">
            <h2 className="text-red-600 font-bold">Error</h2>
            <h3>{props.message}</h3>
            {props.info ?? <p>{props.info}</p>}
        </div>
    )
}

export default ErrorMessage;