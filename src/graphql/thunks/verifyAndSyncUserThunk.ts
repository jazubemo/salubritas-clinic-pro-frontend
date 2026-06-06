import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUser, signOut, User, Auth } from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { setCredentials } from '../../lib/features/auth/authSlice';
import { ApolloClient } from '@apollo/client';
import { GET_ME } from '../queries/getMe';
import { GetMeQuery } from '@/__generated__/graphql';

interface VerifyUserArgs {
  user: User;
  token: string;
  auth: Auth;
  router: AppRouterInstance;
  apolloClient: ApolloClient;
}

export const verifyAndSyncUserThunk = createAsyncThunk<
  void, 
  VerifyUserArgs, 
  { rejectValue: string }
>(
  'auth/verifyAndSyncUser',
  async ({ user, token, auth, router, apolloClient }, thunkAPI) => {
    try {
      const { data, error: gqlError } = await apolloClient.query<GetMeQuery>({
        query: GET_ME,
        fetchPolicy: "network-only",
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });


      if (!data || !data.getMe || gqlError) {
        await deleteUser(user);
        await signOut(auth);
        router.replace("/access-denied");
        return thunkAPI.rejectWithValue("Access Denied: Record not found in system.");
      }

      thunkAPI.dispatch(setCredentials(data.getMe));

      router.replace("/dashboard");

    } catch (error: any) {
      await signOut(auth);
      router.replace("/access-denied");
      return thunkAPI.rejectWithValue(error.message || "Verification process failed.");
    }
  }
);
