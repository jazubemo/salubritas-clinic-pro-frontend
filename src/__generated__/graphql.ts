/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** The available user roles within a clinic. */
export type Role =
  | 'ADMIN'
  | 'DOCTOR'
  | 'PATIENT';

/** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
export type Status =
  | 'ACTIVE'
  | 'ARCHIVED';

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { _id: string, authId: string, dni: string, email: string | null, firstName: string, lastName: string, clinicMemberships: Array<{ name: string, roles: Array<Role>, status: Status, clinicId: string }> } | null };

export type QueryQueryVariables = Exact<{
  activeClinicId: string;
}>;


export type QueryQuery = { getUsers: Array<{ _id: string, authId: string, dni: string, firstName: string, lastName: string }> };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authId"}},{"kind":"Field","name":{"kind":"Name","value":"dni"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"clinicMemberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"clinicId"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activeClinicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"activeClinicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activeClinicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authId"}},{"kind":"Field","name":{"kind":"Name","value":"dni"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ClinicMembership = {
  __typename?: 'ClinicMembership';
  clinicId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<Role>;
  /** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
  status: Status;
};

export type Query = {
  __typename?: 'Query';
  getHello: Scalars['String']['output'];
  getMe?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetHelloArgs = {
  activeClinicId: Scalars['String']['input'];
};


export type QueryGetUsersArgs = {
  activeClinicId: Scalars['String']['input'];
};

/** The available user roles within a clinic. */
export enum Role {
  Admin = 'ADMIN',
  Doctor = 'DOCTOR',
  Patient = 'PATIENT'
}

/** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
export enum Status {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  /** The unique security identifier (UID) provided by Firebase Authentication. Used to map the database user to their authenticated identity. */
  authId: Scalars['String']['output'];
  /** Map of clinic IDs to the user's assigned roles at each location. */
  clinicMemberships: Array<ClinicMembership>;
  /** The Honduran National Identification Document number. Format: 13 digits without hyphens (e.g., 0801199512345). */
  dni: Scalars['String']['output'];
  /** The user's email. It's linked to firebase authentication. */
  email?: Maybe<Scalars['String']['output']>;
  /** The user's given name(s). Includes first and middle names (e.g., 'Carlos Alberto'). */
  firstName: Scalars['String']['output'];
  /** The user's legal surname(s). */
  lastName: Scalars['String']['output'];
};
