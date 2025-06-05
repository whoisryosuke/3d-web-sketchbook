# 3D Web Starter

A starter for exploring the 3D in ReactJS using ThreeJS and React Three Fiber.

## Development

1. `yarn`
1. `yarn dev`

## Tips

- The top level R3F component should always be imported using NextJS `dynamic()` API and SSR disabled (see [src/index.ts](src/index.ts) for an example). Any other component inside doesn't need it. This ensure the component only loads client-side, and has no issues with SSR.
