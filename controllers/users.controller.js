const db = require("../db");

exports.register = async (req, res, next) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const user = await db.user.create({
      data: { name, email, phoneNumber },
    });

    return res.json({ msg: `user ${user.username} registerd` });
    // res.json({ salt, hashedPasssword, time: Date.now() - now });
  } catch (e) {
    next(e);
  }
};

exports.userList = async (req, res) => {
  // TODO: service!
  const users = await db.user.findMany({});
  res.json(users);
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
