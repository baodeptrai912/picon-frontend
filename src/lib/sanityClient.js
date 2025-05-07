import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Replace with your Sanity project ID
  dataset: import.meta.env.VITE_SANITY_DATASET, // Replace with your dataset name
  apiVersion: '2025-04-26', // Use a recent API version
  useCdn: true, // Enable CDN for faster responses
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}