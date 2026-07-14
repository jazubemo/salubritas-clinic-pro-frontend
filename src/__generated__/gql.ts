/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Appointments(\n    $activeClinicId: String!\n    $startRange: String!\n    $doctorId: ID\n    $endRange: String!\n    $patientId: ID\n  ) {\n    appointments(\n      activeClinicId: $activeClinicId\n      startRange: $startRange\n      doctorId: $doctorId\n      endRange: $endRange\n      patientId: $patientId\n    ) {\n      _id\n      clinicId\n      createdAt\n      doctorId\n      doctorName\n      endTime\n      isNewPatient\n      patientId\n      patientName\n      reason\n      startTime\n      status\n      updatedAt\n    }\n  }\n": typeof types.AppointmentsDocument,
    "\n  query Doctors($activeClinicId: String!) {\n    doctors(activeClinicId: $activeClinicId) {\n      _id\n      email\n      firstName\n      lastName\n      fullName\n      clinicMemberships {\n        shifts {\n          daysOfWeek\n          endTime\n          startTime\n        }\n      }\n      doctorProfile {\n        specialty\n      }\n    }\n  }\n": typeof types.DoctorsDocument,
    "\n  query GetMe {\n    getMe {\n      _id\n      authId\n      dni\n      email\n      firstName\n      lastName\n      fullName \n      clinicMemberships {\n        name\n        roles\n        status\n        clinicId\n        shifts {\n          daysOfWeek\n          endTime\n          startTime\n        }\n      }\n    }\n  }\n": typeof types.GetMeDocument,
    "\n  query searchPatients($activeClinicId: String!, $query: String!) {\n    searchPatients(activeClinicId: $activeClinicId, query: $query) {\n      _id\n      firstName\n      lastName\n    }\n  }\n": typeof types.SearchPatientsDocument,
};
const documents: Documents = {
    "\n  query Appointments(\n    $activeClinicId: String!\n    $startRange: String!\n    $doctorId: ID\n    $endRange: String!\n    $patientId: ID\n  ) {\n    appointments(\n      activeClinicId: $activeClinicId\n      startRange: $startRange\n      doctorId: $doctorId\n      endRange: $endRange\n      patientId: $patientId\n    ) {\n      _id\n      clinicId\n      createdAt\n      doctorId\n      doctorName\n      endTime\n      isNewPatient\n      patientId\n      patientName\n      reason\n      startTime\n      status\n      updatedAt\n    }\n  }\n": types.AppointmentsDocument,
    "\n  query Doctors($activeClinicId: String!) {\n    doctors(activeClinicId: $activeClinicId) {\n      _id\n      email\n      firstName\n      lastName\n      fullName\n      clinicMemberships {\n        shifts {\n          daysOfWeek\n          endTime\n          startTime\n        }\n      }\n      doctorProfile {\n        specialty\n      }\n    }\n  }\n": types.DoctorsDocument,
    "\n  query GetMe {\n    getMe {\n      _id\n      authId\n      dni\n      email\n      firstName\n      lastName\n      fullName \n      clinicMemberships {\n        name\n        roles\n        status\n        clinicId\n        shifts {\n          daysOfWeek\n          endTime\n          startTime\n        }\n      }\n    }\n  }\n": types.GetMeDocument,
    "\n  query searchPatients($activeClinicId: String!, $query: String!) {\n    searchPatients(activeClinicId: $activeClinicId, query: $query) {\n      _id\n      firstName\n      lastName\n    }\n  }\n": types.SearchPatientsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Appointments(\n    $activeClinicId: String!\n    $startRange: String!\n    $doctorId: ID\n    $endRange: String!\n    $patientId: ID\n  ) {\n    appointments(\n      activeClinicId: $activeClinicId\n      startRange: $startRange\n      doctorId: $doctorId\n      endRange: $endRange\n      patientId: $patientId\n    ) {\n      _id\n      clinicId\n      createdAt\n      doctorId\n      doctorName\n      endTime\n      isNewPatient\n      patientId\n      patientName\n      reason\n      startTime\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Appointments(\n    $activeClinicId: String!\n    $startRange: String!\n    $doctorId: ID\n    $endRange: String!\n    $patientId: ID\n  ) {\n    appointments(\n      activeClinicId: $activeClinicId\n      startRange: $startRange\n      doctorId: $doctorId\n      endRange: $endRange\n      patientId: $patientId\n    ) {\n      _id\n      clinicId\n      createdAt\n      doctorId\n      doctorName\n      endTime\n      isNewPatient\n      patientId\n      patientName\n      reason\n      startTime\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Doctors($activeClinicId: String!) {\n    doctors(activeClinicId: $activeClinicId) {\n      _id\n      email\n      firstName\n      lastName\n      fullName\n      clinicMemberships {\n        shifts {\n          daysOfWeek\n          endTime\n          startTime\n        }\n      }\n      doctorProfile {\n        specialty\n      }\n    }\n  }\n"): (typeof documents)["\n  query Doctors($activeClinicId: String!) {\n    doctors(activeClinicId: $activeClinicId) {\n      _id\n      email\n      firstName\n      lastName\n      fullName\n      clinicMemberships {\n        shifts {\n          daysOfWeek\n          endTime\n          startTime\n        }\n      }\n      doctorProfile {\n        specialty\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMe {\n    getMe {\n      _id\n      authId\n      dni\n      email\n      firstName\n      lastName\n      fullName \n      clinicMemberships {\n        name\n        roles\n        status\n        clinicId\n        shifts {\n          daysOfWeek\n          endTime\n          startTime\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    getMe {\n      _id\n      authId\n      dni\n      email\n      firstName\n      lastName\n      fullName \n      clinicMemberships {\n        name\n        roles\n        status\n        clinicId\n        shifts {\n          daysOfWeek\n          endTime\n          startTime\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchPatients($activeClinicId: String!, $query: String!) {\n    searchPatients(activeClinicId: $activeClinicId, query: $query) {\n      _id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query searchPatients($activeClinicId: String!, $query: String!) {\n    searchPatients(activeClinicId: $activeClinicId, query: $query) {\n      _id\n      firstName\n      lastName\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;