import profile1 from "./assets/profile-1.jpg";
import profile2 from "./assets/profile-2.jpg";
import profile3 from "./assets/profile-3.jpg";
import profile4 from "./assets/profile-4.jpg";
import profile5 from "./assets/profile-5.jpg";
import profile6 from "./assets/profile-6.jpg";
import profile7 from "./assets/profile-7.jpg";
import profile8 from "./assets/profile-8.jpg";
import profile9 from "./assets/profile-9.jpg";
import profile10 from "./assets/profile-10.jpg";
import profile11 from "./assets/profile-11.jpg";
import profile12 from "./assets/profile-12.jpg";

const images = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
  profile7,
  profile8,
  profile9,
  profile10,
  profile11,
  profile12,
];
export default function generateImg() {
  const random = Math.trunc(Math.random() * images.length) + 1;

  return images[random];
}
