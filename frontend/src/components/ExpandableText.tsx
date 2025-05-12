import { useState } from "react";
import { useGeneralContext } from "../context/GeneralContext";
import { highlightMatch } from "../utils";

interface ExpandableTextProps {
  text: string;
  maxChars?: number;
  includeSynopsis?: boolean;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxChars = 100,
  includeSynopsis
}) => {
  const [expanded, setExpanded] = useState(false);

  const { searchMovies } = useGeneralContext();

  const isLongText = text.length > maxChars;
  const displayedText = expanded || !isLongText
    ? text
    : text.slice(0, maxChars).trimEnd() + "...";

  const toggleExpanded = () => setExpanded(prev => !prev);

  return (
    <div style={{ fontSize: "0.9rem", lineHeight: "1.5rem" }}>
      {includeSynopsis === true ? (
        <p>
          {highlightMatch(
            expanded || !isLongText
              ? text
              : text.slice(0, maxChars).trimEnd() + "...",
            searchMovies
          )}
        </p>
      ) : (
        <p>{displayedText}</p>
      )}
      {isLongText && (
        <p
          style={{ cursor: "pointer", marginTop: "-20px", color: "gray" }}
          className="p-0"
          onClick={toggleExpanded}
        >
          {expanded ? "Show less" : "Show more"}
        </p>
      )}
    </div>
  );
};