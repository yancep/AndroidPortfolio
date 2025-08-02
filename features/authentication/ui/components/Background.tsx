import { PRIMARY_COLOR } from "@/core/theme/app_colors";

export default function Background() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1420 651"
      fill="cover"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      style={{ display: 'block', margin: 0, padding: 0 }} // Estilos en línea para eliminar padding y margin
    >
      <rect width="1520" height="650" fill={PRIMARY_COLOR} fillOpacity="0.1" />
      <g clipPath="url(#clip0_2186_47784)">
        <path d="M0 650.73H1520V410L0 650.73Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_2186_47784">
          <rect
            width="1520"
            height="240.73"
            fill="white"
            transform="translate(0 410)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
