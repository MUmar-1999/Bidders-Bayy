import { BASE_URL } from "../api/BidderApi";

export function normalizeImage(imagePath) {
    const normalizedImagePath = imagePath
        .replace(/\\/g, "/")
        .replace(/^\//, "");
    const imageUrl = `${BASE_URL}/${normalizedImagePath}`;
    return imageUrl;
}