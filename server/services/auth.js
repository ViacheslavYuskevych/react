const UserModel = require('../models/user');
const tokenService = require('../services/token');
const UserDto = require('../dto/user');

const bcrypt = require('bcrypt');

class AuthService {
  async signUp({ email, name, password }) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`User with ${email} email has already existed!`);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.PASSWORD_SALT)
    );

    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generate({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new AuthService();
