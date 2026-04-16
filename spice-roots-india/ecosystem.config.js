module.exports = {
  apps: [
    {
      name: 'spice-roots-api',
      script: 'npm',
      args: 'start',
      cwd: './apps/server',
      env: {
        NODE_ENV: 'production',
        PORT: 4005,
      },
    },
    {
      name: 'spice-roots-web',
      script: 'npm',
      args: 'start -- -p 3005',
      cwd: './apps/web',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
