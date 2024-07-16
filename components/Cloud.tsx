import { useAppDispatch } from "@/store/hooks";
import userStoreHelper from "@/store/user/user.store.helper";
import React from "react";

export default function Cloud() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(userStoreHelper.Actions.getProfile());
  }, []);

  return null;
}
