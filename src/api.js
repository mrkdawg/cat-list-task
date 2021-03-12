/**
 * Get an array of cats of a given category from The Cat API.
 * @param {number} categoryId
 * @param {number} page
 * @returns Promise with response.
 */
export async function getCatsByCategory(categoryId, page = 0) {
  const response = await fetch(`${process.env.API_URL}/images/search?category_ids=${categoryId}&limit=8&page=${page}&order=desc`, {
    headers: { "x-api-key": process.env.API_KEY }
  });

  if (!response.ok) throw new Error();

  return response.json();
}