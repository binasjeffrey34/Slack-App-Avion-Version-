import profile1 from "./assets/images/profile-1.jpg";
import profile2 from "./assets/images/profile-2.jpg";
import profile3 from "./assets/images/profile-3.jpg";
import profile4 from "./assets/images/profile-4.jpg";
import profile5 from "./assets/images/profile-5.jpg";
import profile6 from "./assets/images/profile-6.jpg";
import profile7 from "./assets/images/profile-7.jpg";
import profile8 from "./assets/images/profile-8.jpg";
import profile9 from "./assets/images/profile-9.jpg";
import profile10 from "./assets/images/profile-10.jpg";
import profile11 from "./assets/images/profile-11.jpg";
import profile12 from "./assets/images/profile-12.jpg";
import profile13 from "./assets/images/profile-13.jpg";
import profile14 from "./assets/images/profile-14.jpg";
import profile15 from "./assets/images/profile-15.jpg";
import profile16 from "./assets/images/profile-16.jpg";
import profile17 from "./assets/images/profile-17.jpg";
import profile18 from "./assets/images/profile-18.jpg";
import profile19 from "./assets/images/profile-19.jpg";
import profile20 from "./assets/images/profile-20.jpg";
import profile21 from "./assets/images/profile-21.jpg";
import profile22 from "./assets/images/profile-22.jpg";
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
  profile13,
  profile14,
  profile15,
  profile16,
  profile17,
  profile18,
  profile19,
  profile20,
  profile21,
  profile22,
];

export default function generateImg() {
  const random = Math.trunc(Math.random() * images.length);

  return images[random];
}
