export const BRAND_NAME = "ChaosFinder";
export const BASE_URL = "https://openlibrary.org";
export const FETCH_LIMIT = 20;
export const SEARCH_TYPES = ["Title", "Author", "Genre"];
export const NOT_FOUND_IMAGE_URL = "https://www.whitelotusbooks.com/assets/images/no-image2.png";
export const GET_IMAGE_URL = "https://covers.openlibrary.org/b/id";
export const GET_BOOK_URL = (id: string) => `${BASE_URL}/works/${id}`;