import CloseIcon from "@mui/icons-material/Close";
import { darken } from "../utils";

interface IActiveFilterPill {
  color: string;
  label: string;
  onClick: () => void;
}

export default function ActiveFilterPill({
  color,
  label,
  onClick,
}: IActiveFilterPill) {
  return (
    <div
      className="d-flex align-items-center px-3 me-2"
      style={{
        borderRadius: "20px",
        backgroundColor: color,
        border: `2px solid ${darken(color, 0.5)}`,
      }}
    >
      <p className="m-0 p-0">{label}</p>
      <span onClick={onClick} className="ms-1" style={{ cursor: "pointer" }}>
        <CloseIcon style={{ width: "1.2rem" }} />
      </span>
    </div>
  );
}
