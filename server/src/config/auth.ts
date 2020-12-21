export default {
    jwt: {
      secret: process.env.JWT_APP_SECRET || 'default',
      expiresIn: '30d',
    }
}