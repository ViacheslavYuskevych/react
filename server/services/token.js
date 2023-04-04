const jwt = require('jsonwebtoken');

const TokenModel = require('../models/token');

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: `${process.env.JWT_REFRESH_LIFE_TIME_IN_MIN}m`,
    });

    return { refreshToken, accessToken };
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    return TokenModel.create({ user: userId, refreshToken });
  }
}

module.exports = new TokenService();
