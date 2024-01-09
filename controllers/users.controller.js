const db = require("../db");
const bc = require("bcrypt");
const { createToken } = require("../utils");

exports.userList = async (req, res) => {
  // TODO: service!
  const users = await db.user.findMany({ Select : {
    name,
    email,
  }});
  res.json(users);
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = await bc.genSalt(10);
    const hashedPasssword = await bc.hash(password, salt);
    const user = await db.user.create({
      data: { username, password: hashedPasssword },
    });
    // if user exist what then ? 
    return res.json({ msg: `user ${user.username} registerd` });
  } catch (e) {
  // TODO: Error handler!
    next(e);
    // console.log(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db.user.findFirstOrThrow({ where: { username } });
    if (!user) {
      throw new Error("username or password is incorrect");
    }
    const verified = await bc.compare(password, user.password);
    if (!verified) {
      throw new Error("username or password is incorrect");
    }
    const token = await createToken(
      { username },
      process.env.SECRET_KEY,
      process.env.REFRESH_TOKEN_TIME,
      process.env.ACCESS_TOKEN_TIME,
      // username
    );
    return res.json({
      token,
    });
  } catch (e) {
    // TODO: Error handler!
    next(e);
    // console.log(e);
  }
};






exports.getUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await db.user.findFirst({
      where: { name: username },
      include: {
        Address: true,
        FinalOrders: true,
        Basket: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "کاربر یافت نشد" });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    await db.user.delete({
      where: {
        name: username,
      },
    });
    res.send("user deleted");
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const username = req.params.username;
  const { email, phoneNumber } = req.body;
  await db.user.update({
    where: {
      name: username,
    },
    data: {
      email: email,
      phoneNumber: phoneNumber,
    },
  });
  res.send("user updated");
};
