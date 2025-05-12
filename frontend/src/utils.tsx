export const orderByOptions = [
    { value: "default", label: "Default" },
    { value: "title_asc", label: "Title (A-Z)" },
    { value: "title_desc", label: "Title (Z-A)" },
    { value: "duration_asc", label: "Duration (Shortest)" },
    { value: "duration_desc", label: "Duration (Longest)" },
    { value: "rating_asc", label: "Your Rating (Lowest)" },
    { value: "rating_desc", label: "Your Rating (Highest)" },
    { value: "score_asc", label: "Score (Lowest)" },
    { value: "score_desc", label: "Score (Highest)" },
]

export const filterRatingOptions = [
    { value: "all", label: "All Movies" },
    { value: "any", label: "Any Rating" },
    { value: "unrated", label: "Unrated" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
]


export function formatMinutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

export function highlightMatch(text: string, search: string) {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "ig");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        style={{
          backgroundColor: "#ffe066",
          borderRadius: "3px",
          padding: "0 2px",
        }}
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}
  
export function darken(hex: string, amount = 0.2) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map(x => x + x).join("");
  const num = parseInt(c, 16);
  let r = Math.max(0, ((num >> 16) & 0xff) * (1 - amount));
  let g = Math.max(0, ((num >> 8) & 0xff) * (1 - amount));
  let b = Math.max(0, (num & 0xff) * (1 - amount));
  return `rgb(${r},${g},${b})`;
}