import Urls from "../../utils/urls";
import * as HttpRequests from "./utils/httpRequests";
import * as Actions from "../index";
import ApiResponseState from "../../utils/responseState";
import PointLogStatus from "../../utils/pointLogStatus";
import { ToastAndroid } from "react-native";
import Strings from "../../../utils/strings";
import { AsyncStorage } from "react-native";

export const login = (phoneNumber) => {
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
  return async (dispatch) => {
    try {
      const response = await fetch(
        Urls.BASE_URL +
          Urls.SIGN_UP +
          HttpRequests.createRequestParams({
            PhoneNumber: phoneNumber,
            Name: name,
          }),
        HttpRequests.postRequest()
      );

      const json = await response.json();

      if (json.state === ApiResponseState.SUCCESS) {
        dispatch(Actions.setCodeSent(true));
      } else {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      ToastAndroid.show(Strings.SIGN_UP_ERROR, ToastAndroid.SHORT);
    }
  };
};

export const verifyPhoneNumber = (phoneNumber, code) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        Urls.BASE_URL +
          Urls.VERIFY_PHONE_NUMBER +
          HttpRequests.createRequestParams({
            PhoneNumber: phoneNumber,
            Code: code,
          }),
        HttpRequests.postRequest()
      );
      const json = await response.json();

      if (json.state === ApiResponseState.SUCCESS) {
        const responseObj = JSON.parse(json.value.replace(/[/]+/g, ""));
        const { Token: token, Name: name, Image: image } = responseObj;
        AsyncStorage.setItem("token", token);
        dispatch(
          Actions.setUserInfo({
            token,
            name,
            image,
          })
        );
      } else {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      ToastAndroid.show(Strings.WRONG_VERIFICATION_CODE, ToastAndroid.SHORT);
    }
  };
};

export const finishGame = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      const response = await fetch(
        Urls.BASE_URL + Urls.FINISH_GAME,
        HttpRequests.getRequest(token)
      );

      const json = await response.json();

      if (json.state === ApiResponseState.SUCCESS) {
        console.log("finish was successful");
      } else {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      /*    Toast.makeText(
        GameActivity.this,
        "Error in register points",
        Toast.LENGTH_LONG
      ).show(); */
    }
  };
};

export const logPoint = (status) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      const response = await fetch(
        Urls.BASE_URL +
          Urls.LOG_POINT +
          HttpRequests.createRequestParams({ Status: status }),
        HttpRequests.postRequest(token)
      );
      console.log(response);
      const json = await response.json();

      if (json.state === ApiResponseState.SUCCESS) {
        console.log("log was successful");
      } else {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e.message);
    }
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
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      const response = await fetch(
        Urls.BASE_URL + Urls.GET_POINTS_INFO,
        HttpRequests.getRequest(token)
      );
      const json = await response.json();

      if (json.state === ApiResponseState.SUCCESS) {
        const responseObj = JSON.parse(json.value.replace(/[/]+/g, ""));
        const {
          CurrentPoint: currentPoint,
          PointInRecord: pointInRecord,
          Rank: rank,
          Record: record,
          TotalPoints: totalPoints,
        } = responseObj;

        dispatch(
          Actions.setPointsInfo({
            currentPoint,
            pointInRecord,
            rank,
            record,
            totalPoints,
          })
        );
      } else {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      ToastAndroid.show(Strings.WRONG_VERIFICATION_CODE, ToastAndroid.SHORT);
      console.log("EEEEEEEEEEEEEEEEEEE");
    }
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
            points: getState().appStatus.points + json.value,
          })
        );
      }
    } catch (e) {
      ToastAndroid.show(Strings.WRONG_VERIFICATION_CODE, ToastAndroid.SHORT);
    }
  };
};
