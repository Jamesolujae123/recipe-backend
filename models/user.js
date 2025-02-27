import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },

      first_name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      last_name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image_url: {
        type: DataType.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
  Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  Users.getUserById = async (id) => {
    try {
      const user = await Users.findOne({
        attributes: ["first_name", "last_name", "email", "phone", "image_url"],
        where: { id },
      });
      return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        image_url: user.image_url,
      };
    } catch (error) {
      throw new Error("User not found");
    }
  };

  return Users;
};
