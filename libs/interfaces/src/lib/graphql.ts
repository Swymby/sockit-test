
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Message {
    __typename?: 'Message';
    message: string;
}

export interface Generator {
    __typename?: 'Generator';
    number: number;
}

export interface IQuery {
    __typename?: 'IQuery';
    messages(): Message | Promise<Message>;
}

export interface ISubscription {
    __typename?: 'ISubscription';
    generated(): Generator | Promise<Generator>;
    generatedWorkspace(workspaceId: string, max?: number): Generator | Promise<Generator>;
}
