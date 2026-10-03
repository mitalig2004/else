// Original vector illustration family. Decorative art never encodes financial status.
const stroke='fill="none" stroke="#17233C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
export function illustration(kind,cls=''){
 const pieces={
  phone:`<path d="M69 36q-14 15-9 43l20 24 24-17-6-42Z" fill="#9B91C7"/><rect x="77" y="22" width="44" height="82" rx="10" fill="#8EBBD0"/><rect x="84" y="32" width="30" height="56" rx="3" fill="#F7F8FA"/><path d="M91 97h14M89 26h20M42 93q13-18 27-15l15 7M125 48l11-5M131 68h12"/>`,
  suitcase:`<path d="M67 38v-9q0-10 12-10h25q12 0 12 10v9"/><rect x="48" y="39" width="89" height="71" rx="12" fill="#F2C66D"/><path d="M72 39v71m40-71v71M58 76h66"/><rect x="80" y="68" width="19" height="17" rx="3" fill="#F7F8FA"/><circle cx="66" cy="115" r="5" fill="#17233C"/><circle cx="119" cy="115" r="5" fill="#17233C"/><path d="m143 35 9-7m-2 26 12 1"/>`,
  coffee:`<path d="M54 43h68l-7 62q-2 11-14 11H75q-12 0-14-11Z" fill="#E98572"/><path d="M123 56h10q18 0 16 17-2 16-29 16M51 42h73M57 67h61"/><path d="M72 29q-9-8 0-18m24 18q-9-8 0-18"/><circle cx="87" cy="88" r="12" fill="#F7F8FA"/>`,
  wallet:`<rect x="37" y="43" width="116" height="69" rx="12" fill="#8EB89C"/><path d="m48 43 3-21 79 12v9" fill="#F2C66D"/><path d="M61 29l42 6"/><path d="M116 65h38v27h-38q-12 0-12-13t12-14Z" fill="#F7F8FA"/><circle cx="119" cy="79" r="3" fill="#17233C"/><path d="m149 22 7-9m4 25 12-1"/>`,
  receipt:`<path d="m59 20 8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7v96l-8-7-8 7-8-7-8 7-8-7-8 7-8-7-8 7Z" fill="#F7F8FA"/><path d="M72 43h40M72 58h29M72 74h40"/><circle cx="79" cy="91" r="2" fill="#17233C"/><circle cx="105" cy="91" r="2" fill="#17233C"/><path d="m87 101 9-2m43-42 14-7m-110 6-12-6"/>`,
  ripple:`<circle cx="95" cy="69" r="12" fill="#F2C66D"/><ellipse cx="95" cy="73" rx="35" ry="22"/><ellipse cx="95" cy="76" rx="61" ry="37"/><path d="m141 103 9 2-4-10M46 42l-10-1 3 10"/><circle cx="155" cy="36" r="8" fill="#E98572"/><circle cx="35" cy="112" r="6" fill="#9B91C7"/>`,
  person:`<circle cx="83" cy="32" r="16" fill="#F2C66D"/><path d="M68 25q8-21 28-9l4 13M86 32h1M96 41l-7 2"/><path d="M66 55q19-10 34 5l13 28-27 13-28-17Z" fill="#9B91C7"/><path d="M96 64l19 7 8-20M68 68l-20 17 18 10M81 97l-14 20H43m46-17 22 17h27"/><rect x="119" y="34" width="20" height="32" rx="4" fill="#8EBBD0"/><path d="m140 29 9-5m-7 49 11 3"/>`,
  shared:`<circle cx="55" cy="35" r="14" fill="#F2C66D"/><circle cx="133" cy="35" r="14" fill="#E98572"/><path d="M39 59q17-13 34 0l7 26H32Z" fill="#9B91C7"/><path d="M117 58q17-13 33 0l9 27h-51Z" fill="#8EBBD0"/><path d="m69 64 20 18m31-18-20 18M43 89l-6 25m31-25 6 25m45-25-6 25m31-25 6 25"/><rect x="77" y="77" width="36" height="34" rx="5" fill="#F2C66D"/><path d="M88 77v-7h14v7M90 91h9M83 23q13-12 25 0"/>`,
  paths:`<circle cx="57" cy="37" r="15" fill="#F2C66D"/><path d="M40 63q17-12 33 0l-2 32H43Z" fill="#8EBBD0"/><path d="m45 95-12 23m34-23 17 23M72 68q17-11 28-8m-2 0 19-25m-19 25 24 17m-24-17 37-2M110 30l7 5-1-9M124 70l-2 7 8-1"/><circle cx="140" cy="58" r="10" fill="#9B91C7"/>`
 };
 return `<svg class="illustration ${cls}" viewBox="0 0 190 140" aria-hidden="true" ${stroke}>${pieces[kind]||pieces.ripple}</svg>`;
}
export const logo=()=>'<span class="else-wordmark">else<span>.</span></span>';
export const arrow=()=>'<span class="button-arrow" aria-hidden="true">→</span>';
export const doodle=()=>'<svg class="doodle" viewBox="0 0 100 30" aria-hidden="true"><path d="M3 18Q36 1 68 14t23 1m-5-7 6 8-10 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
