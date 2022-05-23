# Next.js Commerce

## Considerations

- `packages/commerce` contains all types, helpers and functions to be used as base to build a new **provider**.
- **Providers** live under `packages`'s root folder and they will extend Next.js Commerce types and functionality (`packages/commerce`).
- We have a **Features API** to ensure feature parity between the UI and the Provider. The UI should update accordingly and no extra code should be bundled. All extra configuration for features will live under `features` in `commerce.config.json` and if needed it can also be accessed programatically.
- Each **provider** should add its corresponding `next.config.js` and `commerce.config.json` adding specific data related to the provider. For example in case of BigCommerce, the images CDN and additional API routes.

## Configuration

### Features

Every provider defines the features that it supports under `packages/{provider}/src/commerce.config.json`

#### Features Available

The following features can be enabled or disabled. This means that the UI will remove all code related to the feature.
For example: Turning `cart` off will disable Cart capabilities.

- cart
- search
- wishlist
- customerAuth
- customCheckout

#### How to turn Features on and off

> NOTE: The selected provider should support the feature that you are toggling. (This means that you can't turn wishlist on if the provider doesn't support this functionality out the box)

- Open `site/commerce.config.json`
- You'll see a config file like this:
  ```json
  {
    "features": {
      "wishlist": false,
      "customCheckout": true
    }
  }
  ```
- Turn `wishlist` on by setting `wishlist` to `true`.
- Run the app and the wishlist functionality should be back on.

## After run

1. Install [mkcert](https://github.com/FiloSottile/mkcert#installation)
2. Generate a CA i.e Certificate Authority: `mkcert -install`
3. Generate a certificate for localhost server: `mkdir site/cert`, `cd site/cert` and `mkcert localhost`
4. Install the dependencies: `yarn`
5. Duplicate `site/.env.template` and rename it to `site/.env.local`
6. Add proper store values to `site/.env.local`

## Run

Run `yarn dev`
