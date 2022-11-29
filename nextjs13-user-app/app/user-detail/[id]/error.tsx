'use client';

import { useEffect } from "react";
import ErrorMessage from "../../../components/error-message";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <ErrorMessage message={error.message} info={error.name} />

    )
} 