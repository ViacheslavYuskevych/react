const AuthService = require('../services/auth');

class AuthController {
  async signUp(req, res, next) {
    try {
      const { email, name, password } = req.body;

      const data = await AuthService.signUp({ email, name, password });

      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge:
          Number(process.env.JWT_REFRESH_LIFE_TIME_IN_MIN) * 1_000 * 60 * 60,
      });

      return res.json(data);
    } catch (error) {
      console.error(error);

      res.status(500).send('Something broke!');
    }
  }

  async signIn(req, res, next) {
    try {
    } catch (error) {}
  }

  async signOut(req, res, next) {
    try {
    } catch (error) {}
  }

  async check(req, res, next) {
    try {
      res.json(['123']);
    } catch (error) {}
  }

  async getRefreshToken(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = new AuthController();
