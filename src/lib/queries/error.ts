import { isObject } from "@lib/utils";
import { AxiosError } from "axios";

export class UnexpectedError extends Error {
    constructor() {
        super("Unexpected error occurred");
    }
}
export class NotFoundError extends Error {
    constructor() {
        super("Resource not found");
    }
}

export class DetailError extends Error {
    constructor(detail: string) {
        super(detail);
    }
}

export class ForbiddenError extends DetailError { }

export class FormError extends Error {
    allMessages: string[];

    constructor(error: AxiosError) {
        super(undefined);
        this.allMessages = [];

        const response = isObject(error, true) && isObject(error.response, true) ? error.response : null;
        const data = response?.data as Record<string, any> | null;

        if (Array.isArray(data?.message)) {
            this.allMessages = data.message.filter((msg) => typeof msg === "string");
        }

        if (!this.allMessages?.length) {
            this.allMessages = ["Une erreur inconnue au bataillon est survenue."];
        }
    }
}
