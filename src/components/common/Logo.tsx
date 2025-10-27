import logoIcon from "../../assets/icons/logo-icon.svg";
import logoText from "../../assets/icons/logo-text.svg";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={className} data-name="Logo">
      <div
        className="absolute bottom-0 left-0 right-[76.57%] top-0"
        data-name="Icon"
      >
        <img
          alt="Sterllo Icon"
          className="block max-w-none size-full"
          src={logoIcon}
        />
      </div>
      <div
        className="absolute bottom-[16.41%] left-[34.3%] right-0 top-[16.42%]"
        data-name="Text"
      >
        <img
          alt="Sterllo"
          className="block max-w-none size-full"
          src={logoText}
        />
      </div>
    </div>
  );
}
