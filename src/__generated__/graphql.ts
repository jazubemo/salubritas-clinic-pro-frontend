/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** The current operational status of the appointments */
export type AppointmentStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'CONFIRMED'
  | 'PENDING';

/** The available user roles within a clinic. */
export type Role =
  | 'ADMIN'
  | 'DOCTOR'
  | 'PATIENT';

/** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
export type UserStatus =
  | 'ACTIVE'
  | 'ARCHIVED';

export type AppointmentsQueryVariables = Exact<{
  activeClinicId: string;
  endRange: string;
  startRange: string;
}>;


export type AppointmentsQuery = { appointments: Array<{ _id: string, clinicId: string, createdAt: unknown, doctorId: string, doctorName: string, endTime: unknown, isNewPatient: boolean, patientId: string, patientName: string, reason: string | null, startTime: unknown, status: AppointmentStatus, updatedAt: unknown }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { _id: string, authId: string, dni: string, email: string | null, firstName: string, lastName: string, clinicMemberships: Array<{ name: string, roles: Array<Role>, status: UserStatus, clinicId: string }> } | null };


export const AppointmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Appointments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activeClinicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endRange"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startRange"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appointments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"activeClinicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activeClinicId"}}},{"kind":"Argument","name":{"kind":"Name","value":"endRange"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endRange"}}},{"kind":"Argument","name":{"kind":"Name","value":"startRange"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startRange"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"clinicId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"doctorId"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"isNewPatient"}},{"kind":"Field","name":{"kind":"Name","value":"patientId"}},{"kind":"Field","name":{"kind":"Name","value":"patientName"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AppointmentsQuery, AppointmentsQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authId"}},{"kind":"Field","name":{"kind":"Name","value":"dni"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"clinicMemberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"clinicId"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown; }
};

export type Appointment = {
  __typename?: 'Appointment';
  _id: Scalars['ID']['output'];
  /** Clinic where the appointment was created. */
  clinicId: Scalars['ID']['output'];
  /** Exact date when the appointment was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The doctor that will attend the appointment. */
  doctorId: Scalars['ID']['output'];
  /** The doctor's full name. */
  doctorName: Scalars['String']['output'];
  /** Exact date and time when the appointment ends */
  endTime: Scalars['DateTime']['output'];
  /** States if the user who scheduled the appointment is a new user in the system */
  isNewPatient: Scalars['Boolean']['output'];
  /** The user that requested the appointment */
  patientId: Scalars['ID']['output'];
  /** The patient's full name. */
  patientName: Scalars['String']['output'];
  /** It explains why the appointment was created. */
  reason?: Maybe<Scalars['String']['output']>;
  /** Exact date and time when the appointment starts */
  startTime: Scalars['DateTime']['output'];
  /** The current operational status of the appointments. */
  status: AppointmentStatus;
  /** Date when the appointment was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** The current operational status of the appointments */
export enum AppointmentStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type ClinicMembership = {
  __typename?: 'ClinicMembership';
  clinicId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<Role>;
  /** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
  status: UserStatus;
};

export type CreateAppointmentInput = {
  /** Clinic where the appointment was created. */
  clinicId: Scalars['ID']['input'];
  /** The doctor that will attend the appointment. */
  doctorId: Scalars['ID']['input'];
  endTime: Scalars['DateTime']['input'];
  /** States if the user who scheduled the appointment is a new user in the system */
  isNewPatient: Scalars['Boolean']['input'];
  /** The user that requested the appointment */
  patientId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  status: AppointmentStatus;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppointment: Appointment;
  updateAppointment: Appointment;
};


export type MutationCreateAppointmentArgs = {
  activeClinicId: Scalars['String']['input'];
  createAppointmentInput: CreateAppointmentInput;
};


export type MutationUpdateAppointmentArgs = {
  activeClinicId: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  updateAppointmentInput: UpdateAppointmentInput;
};

export type Query = {
  __typename?: 'Query';
  appointments: Array<Appointment>;
  findAll: Array<User>;
  getHello: Scalars['String']['output'];
  getMe?: Maybe<User>;
};


export type QueryAppointmentsArgs = {
  activeClinicId: Scalars['String']['input'];
  doctorId?: InputMaybe<Scalars['ID']['input']>;
  endRange: Scalars['String']['input'];
  patientId?: InputMaybe<Scalars['ID']['input']>;
  startRange: Scalars['String']['input'];
};


export type QueryFindAllArgs = {
  activeClinicId: Scalars['String']['input'];
};


export type QueryGetHelloArgs = {
  activeClinicId: Scalars['String']['input'];
};

/** The available user roles within a clinic. */
export enum Role {
  Admin = 'ADMIN',
  Doctor = 'DOCTOR',
  Patient = 'PATIENT'
}

export type UpdateAppointmentInput = {
  doctorId?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  isNewPatient?: InputMaybe<Scalars['Boolean']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<AppointmentStatus>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  /** The unique security identifier (UID) provided by Firebase Authentication. Used to map the database user to their authenticated identity. */
  authId: Scalars['String']['output'];
  /** Map of clinic IDs to the user's assigned roles at each location. */
  clinicMemberships: Array<ClinicMembership>;
  /** Exact date when the appointment was created */
  createdAt: Scalars['DateTime']['output'];
  /** The Honduran National Identification Document number. Format: 13 digits without hyphens (e.g., 0801199512345). */
  dni: Scalars['String']['output'];
  /** The user's email. It's linked to firebase authentication. */
  email?: Maybe<Scalars['String']['output']>;
  /** The user's given name(s). Includes first and middle names (e.g., 'Carlos Alberto'). */
  firstName: Scalars['String']['output'];
  /** The user's legal surname(s). */
  lastName: Scalars['String']['output'];
  /** Date when the appointment was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

/** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
export enum UserStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}
