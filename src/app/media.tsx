'use client'

// Media.tsx

import { createMedia } from "@artsy/fresnel";

const ExampleAppMedia = createMedia({
  breakpoints: {
    mobile: 0,
    desktop: 800,
  },
});

// Generate CSS to be injected into the head
// export const mediaStyle = ExampleAppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = ExampleAppMedia;