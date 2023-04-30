# Bitbox - Fast File Hosting

Bitbox is a free and open source file hosting platform, meant to be used and hosted by anyone.

This repository contains the Express.js backend for Bitbox. Unless you want to interact with the API manually, using a frontend is recommended.

## Small

Bitbox is relatively small. Just a few source JavaScript files and a few dependencies.

## Open Source

Bitbox is free and open source under the MIT license, which is permissive.

Anyone can also contribute to the Bitbox project and make it even better.

## Setup

1. install nodejs and yarn
1. clone this repo
1. install deps `yarn`
1. copy config file and remove comments `cp config.json.example config.json`
1. edit config file for your setup
1. read the **Setup Tips** section of this readme
1. run `yarn start` to start the app

## Setup Tips

- don't use cloudflare to proxy requests if you want users to be able to upload files >100MB
- use https. 99.9% of users will not be able to access your server if you use http.
- put your certificates in the `server` folder if using https. certificate file should be named `server.cert`, key file should be named `server.key`, and if you have a CA bundle file, name it `ca_bundle.crt` and enable `https_use_ca_bundle` in the config file.
- want to be added to the server list? I will add servers that are reliably active 24/7. email me at ash@midiidev.xyz to request your server to be added.