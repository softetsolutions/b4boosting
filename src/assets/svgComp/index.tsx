export const EyeIcon = ({ selected }: { selected: boolean }) => {
  const color = selected ? "#00bcd4" : "white";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none" // ensures inside stays transparent
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      width="20px"
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17 S1,32,1,32z"
      />
      <circle
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        cx="32"
        cy="32"
        r="7"
      />
    </svg>
  );
};
