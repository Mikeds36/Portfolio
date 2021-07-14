module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        "fs-extra": false,
        stream: false,
        path: false,
        os: false,
        vm: false,
        http: false,
        https: false,
        child_process: false,
        crypto: false,
        worker_threads: false,
        async_hooks: false,
        tty: false,
        constants: false,
        inspector: false,
        module: false,
        fsevents: false
    }

    return config
  }
}