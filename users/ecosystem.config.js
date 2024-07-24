module.exports = {
  apps : [{
    name: "users",
    script: "./build/src/server.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "prod",
    },
  }],
};
