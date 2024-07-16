import { AppDispatch } from "@/store";
import { get } from "@/utils/api";
import { logout } from "@/utils/auth";
import { UserEndpoints } from "./userConstants";

export enum ActionsType {
  SET_INFORMATION = "SET_INFORMATION",
  SET_LOADING = "SET_LOADING",
}

export interface AddUserInformationAction {
  type: ActionsType.SET_INFORMATION;
  payload: TUserInformation | null;
}

export const addUserInformation = (
  information: TUserInformation | null
): AddUserInformationAction => ({
  type: ActionsType.SET_INFORMATION,
  payload: information,
});

export interface SetLoadingAction {
  type: ActionsType.SET_LOADING;
  payload: boolean;
}

export const setLoading = (loading: boolean): SetLoadingAction => ({
  type: ActionsType.SET_LOADING,
  payload: loading,
});

export const getProfile = () => (dispatch: AppDispatch) => {
  get(
    UserEndpoints.GET_PROFILE,
    (data: any) => {
      dispatch(addUserInformation(data));
      dispatch(setLoading(false));
    },
    (error: any) => {
      logout();
      dispatch(setLoading(false));
    }
  );
};

export const handleProfileLogout = () => (dispatch: AppDispatch) => {
  dispatch(addUserInformation(null));
};

export type UserActionsType = AddUserInformationAction | SetLoadingAction;
