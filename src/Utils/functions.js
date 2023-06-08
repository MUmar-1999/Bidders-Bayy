import { BASE_URL } from "../api/BidderApi";

export function normalizeImage(imagePath) {
    const normalizedImagePath = imagePath
        .replace(/\\/g, "/")
        .replace(/^\//, "");
    const imageUrl = `${BASE_URL}/${normalizedImagePath}`;
    return imageUrl;
}

export function getTimeDifference(timestamp) {
    const currentTime = new Date();
    const commentTime = new Date(timestamp);
    const timeDiff = Math.abs(currentTime - commentTime);
    return formatTimeDifference(timeDiff);
}

function formatTimeDifference(timeDiff) {
    const minutes = Math.floor(timeDiff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else {
        return `${minutes}m`;
    }
}