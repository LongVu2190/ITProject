import { userQueries } from "../data/index.js";
import refreshTokenController from "./refreshTokenController.js";

const login = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log(req.body);
    const response = await userQueries.login(data, res);

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const logout = async (req, res, next) => {

    const cookies = req.cookies;
    console.log(req.cookies)
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    // Is refreshToken in db?
    const foundUser = await refreshTokenController.checkRefreshToken('refreshToken');
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.clearCookie("accountId", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.clearCookie("accountId", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);

};

const register = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await userQueries.register(data);

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res, next) => {
  try {
    const accountId = req.params.accountId;
    const response = await userQueries.getUser(accountId);

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const response = await userQueries.getAllUser();

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const rechargeBalance = async (req, res, next) => {
  try {
    const recharge = req.body.recharge;
    const accountId = req.params.accountId;
    const response = await userQueries.rechargeBalance(recharge, accountId);

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getTicketsOfUser = async (req, res, next) => {
  try {
    const accountId = req.params.accountId;
    const response = await userQueries.getTicketsOfUser(accountId);

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  login,
  logout,
  register,
  getUser,
  rechargeBalance,
  getTicketsOfUser,
  getAllUser,
};
