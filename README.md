bzt
---------

Opens SSH SOCKS proxies to zerotier servers dynamically based on the user selection.  To use,
copy the `.env.sample` into your own `.env` file and change the variables accordingly.  My advice
is to clone this into path on your system, then add an alias to your `~/.bashrc` like this:

```sh
alias bzt="DEBUG=* node ./path/to/bzt/index.js"
```

Then run `bzt`.

Finally change your brower's proxy settings to use the 127.0.0.1 and the $PORT you configured as
a proxy.  All requests will be proxied through your network to the zerotier server you have
specified.
