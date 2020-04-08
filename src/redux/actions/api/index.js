import Urls from "../../utils/urls";
import * as HttpRequests from "./utils/httpRequests";
import * as Actions from "../index";
import ApiResponseState from "../../utils/responseState";
import PointLogStatus from "../../utils/pointLogStatus";
import { ToastAndroid } from "react-native";
import Strings from "../../../utils/strings";

export const login = phoneNumber => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        Urls.BASE_URL +
          Urls.LOGIN +
          HttpRequests.createRequestParams({ PhoneNumber: phoneNumber }),
        HttpRequests.postRequest()
      );

      const json = await response.json();

      if (json.state === ApiResponseState.SUCCESS) {
        dispatch(Actions.setCodeSent(true));
      } else {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e.message);
      ToastAndroid.show(Strings.SIGN_UP_ERROR, ToastAndroid.SHORT);
    }
  };
};

export const signUp = (name, phoneNumber, image) => {
  return async dispatch => {
    try {
      const response = await HttpRequests.postRequest(
        Urls.BASE_URL + Urls.SIGN_UP,
        {
          PhoneNumber: phoneNumber,
          Name: name,
          Image: image
        }
      );
      const json = await response.json();
      if (json.state === ApiResponseState.SUCCESS) {
        dispatch(
          Actions.setAppStatus({ ...getState().appStatus, codeSent: true })
        );
      } else {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      ToastAndroid.show(Strings.SIGN_UP_ERROR, ToastAndroid.SHORT);
    }
  };
};

export const verifyPhoneNumber = (phoneNumber, code) => {
  return async dispatch => {
    try {
      const response = await HttpRequests.postRequest(
        Urls.BASE_URL + Urls.VERIFY_PHONE_NUMBER,
        {
          PhoneNumber: phoneNumber,
          Code: code
        }
      );
      const json = await response.json();
      if (json.state === ApiResponseState.SUCCESS) {
        dispatch(Actions.setUser(json.value));
        Actions.setAppStatus({ ...getState().appStatus, codeSent: false });
      } else {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      ToastAndroid.show(Strings.WRONG_VERIFICATION_CODE, ToastAndroid.SHORT);
    }
  };
};

export const finishGame = () => {
  return async dispatch => {
    try {
      const response = await HttpRequests.postRequest(
        Urls.BASE_URL + Urls.FINISH_GAME
      );
      const json = await response.json();
      if (json.state === ApiResponseState.SUCCESS) {
        dispatch(Actions.setUser(json.value));
        Actions.setAppStatus({ ...getState().appStatus, gameFinished: true });
      }
    } catch (e) {
      Toast.makeText(
        GameActivity.this,
        "Error in register points",
        Toast.LENGTH_LONG
      ).show();
    }
  };
};

export const logPoint = status => {
  return async dispatch => {
    try {
      const response = await HttpRequests.postRequest(
        Urls.BASE_URL + Urls.LOG_POINT,
        {
          Status: status
        }
      );
    } catch (e) {}
  };
};

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState();
      const response = await HttpRequests.getRequest(
        Urls.BASE_URL + Urls.GET_USER,
        token
      );
      const json = await response.json();
      if (json.state === ApiResponseState.SUCCESS) {
        dispatch(Actions.setUser(json.value));
      }
    } catch (e) {}
  };
};

export const getPointInfo = () => {
  return dispatch => {
    return async (dispatch, getState) => {
      try {
        const { token } = getState();
        const response = await HttpRequests.getRequest(
          Urls.BASE_URL + Urls.GET_POINT_INFO,
          token
        );
        const json = await response.json();
        if (json.state === ApiResponseState.SUCCESS) {
          dispatch(Actions.setPointsInfo(json.value));
        }
      } catch (e) {}
    };
  };
};

export const getPoint = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState();
      const response = await HttpRequests.getRequest(
        Urls.BASE_URL + Urls.GET_POINT,
        token
      );
      const json = await response.json();
      if (json.state === ApiResponseState.SUCCESS) {
        dispatch(
          Actions.setAppStatus({
            ...getState().appStatus,
            points: getState().appStatus.points + json.value
          })
        );
      }
    } catch (e) {
      ToastAndroid.show(Strings.WRONG_VERIFICATION_CODE, ToastAndroid.SHORT);
    }
  };
};
