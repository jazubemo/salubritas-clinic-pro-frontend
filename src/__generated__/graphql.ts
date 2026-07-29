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

/** Doctors specialty */
export type Specialty =
  | 'CARDIOTHORACIC_SURGERY'
  | 'GENERAL_SURGERY'
  | 'INTERNAL_MEDICINE'
  | 'PEDIATRIC';

/** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
export type UserStatus =
  | 'ACTIVE'
  | 'ARCHIVED';

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { authId: string, createdAt: unknown, dni: string, email: string, fullName: string, doctor: { id: string, specialty: Specialty } | null, patient: { id: string } | null, clinicMemberships: Array<{ clinicId: string, createdAt: unknown, id: string, name: string, roles: Array<Role>, status: UserStatus, updatedAt: unknown }> | null } | null };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dni"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"doctor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"specialty"}}]}},{"kind":"Field","name":{"kind":"Name","value":"patient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"clinicMemberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clinicId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
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

export type ClinicMembership = {
  __typename?: 'ClinicMembership';
  clinicId: Scalars['ID']['output'];
  /** Timestamp when membership was created */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<Role>;
  /** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
  status: UserStatus;
  /** Timestamp when membership was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type Doctor = {
  __typename?: 'Doctor';
  /** Exact date when the doctor record was created */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** The doctor unique medical license identification string. */
  licenseNumber: Scalars['String']['output'];
  /** The registered medical specialty of the doctor. */
  specialty: Specialty;
  /** Date when the doctor record was last updated */
  updatedAt: Scalars['DateTime']['output'];
  /** The parent user profile associated with this doctor. */
  user?: Maybe<User>;
  /** The unique ID linking this doctor record to a core user. */
  userId: Scalars['String']['output'];
};

export type Patient = {
  __typename?: 'Patient';
  /** Exact date when the patient record was created */
  createdAt: Scalars['DateTime']['output'];
  /** The calendar date of birth (stored as DATE in PostgreSQL). */
  dateOfBirth: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** Date when the patient record was last updated */
  updatedAt: Scalars['DateTime']['output'];
  /** The parent user profile associated with this patient. */
  user?: Maybe<User>;
  /** The unique ID linking this patient record to a core user. */
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getHello: Scalars['String']['output'];
  getMe?: Maybe<User>;
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

/** Doctors specialty */
export enum Specialty {
  CardiothoracicSurgery = 'CARDIOTHORACIC_SURGERY',
  GeneralSurgery = 'GENERAL_SURGERY',
  InternalMedicine = 'INTERNAL_MEDICINE',
  Pediatric = 'PEDIATRIC'
}

export type User = {
  __typename?: 'User';
  /** The unique security identifier (UID) provided by Firebase Authentication. */
  authId: Scalars['String']['output'];
  /** Array of clinic memberships mapping locations to roles. */
  clinicMemberships?: Maybe<Array<ClinicMembership>>;
  /** Exact date when the user profile was created */
  createdAt: Scalars['DateTime']['output'];
  /** The Honduran National Identification Document number. Format: 13 digits without hyphens. */
  dni: Scalars['String']['output'];
  /** The user's optional doctor profile details. */
  doctor?: Maybe<Doctor>;
  /** The user's email. It's linked to firebase authentication. */
  email: Scalars['String']['output'];
  /** The user's given name(s). Includes first and middle names. */
  firstName: Scalars['String']['output'];
  /** Computed property joining first and last name. */
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The user's legal surname(s). */
  lastName: Scalars['String']['output'];
  /** The user's optional patient profile details. */
  patient?: Maybe<Patient>;
  /** Date when the user profile was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

/** The current operational status of the user account. Allowed values: ACTIVE, ARCHIVED. */
export enum UserStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}
