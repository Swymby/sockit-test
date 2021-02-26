
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Message {
    __typename?: 'Message';
    number: number;
}

export interface IQuery {
    __typename?: 'IQuery';
    messages(): Message | Promise<Message>;
}
