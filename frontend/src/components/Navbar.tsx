import "../App.css";

interface NavbarProps {
  title: string;
  subtitle: string;
}

export default function Navbar({ title, subtitle }: NavbarProps) {
  return (
    <div className="navbar">
      <p className="navbar-title">{title}</p>
      <p>{subtitle}</p>
    </div>
  );
}
