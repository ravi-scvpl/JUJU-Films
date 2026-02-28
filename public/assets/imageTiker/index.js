import img1 from './Images-JUJU_1.webp';
import img2 from './Images-JUJU_2.webp';
import img3 from './Images-JUJU_3.webp';
import img4 from './Images-JUJU_4.webp';
import img5 from './Images-JUJU_5.webp';
import img6 from './Images-JUJU_6.webp';
import img7 from './Images-JUJU_7.webp';
import img8 from './Images-JUJU_8.webp';
import img9 from './Images-JUJU_9.webp';
import img10 from './Images-JUJU_10.webp';
import img11 from './Images-JUJU_11.webp';
import img12 from './Images-JUJU_12.webp';
import img13 from './Images-JUJU_13.webp';
import img14 from './Images-JUJU_14.webp';
import img15 from './Images-JUJU_15.webp';
import img16 from './Images-JUJU_16.webp';
import img17 from './Images-JUJU_17.webp';
import img18 from './Images-JUJU_18.webp';
import img19 from './Images-JUJU_19.webp';
import img20 from './Images-JUJU_20.webp';
import img21 from './Images-JUJU_21.webp';
import img22 from './Images-JUJU_22.webp';
import img23 from './Images-JUJU_23.webp';
import img24 from './Images-JUJU_24.webp';
import img25 from './Images-JUJU_25.webp';
import img26 from './Images-JUJU_26.webp';
import img27 from './Images-JUJU_27.webp';
import img28 from './Images-JUJU_28.webp';
import img29 from './Images-JUJU_29.webp';
import img30 from './Images-JUJU_30.webp';
import img31 from './Images-JUJU_31-AI.webp';
import img32 from './Images-JUJU_32-AI.webp';
import img33 from './Images-JUJU_33.webp';
import img34 from './Images-JUJU_34.webp';
import img35 from './Images-JUJU_35.webp';
import img36 from './Images-JUJU_36.webp';
import img37 from './Images-JUJU_37(1).webp';
import img38 from './Images-JUJU_37.webp';
import img39 from './Images-JUJU_38.webp';
import img40 from './Images-JUJU_39.webp';
import img41 from './Images-JUJU_40.webp';
import img42 from './Images-JUJU_41.webp';
import img43 from './Images-JUJU_42.webp';
import img44 from './Images-JUJU_44-1.webp';
import img45 from './Images-JUJU_44.webp';
import img46 from './Images-JUJU_45.webp';
import img47 from './Images-JUJU_46.webp';
import img48 from './Images-JUJU_47.webp';
import img49 from './Images-JUJU_48.webp';
import img50 from './Images-JUJU_49.webp';
import img51 from './Images-JUJU_50.webp';
import img52 from './Images-JUJU_51.webp';
import img53 from './Images-JUJU_52.webp';
import img54 from './Images-JUJU_53.webp';
import img55 from './Images-JUJU_54.webp';
import img56 from './Images-JUJU_55.webp';
import img57 from './Images-JUJU_56.webp';
import img58 from './Images-JUJU_57.webp';
import img59 from './Images-JUJU_58.webp';
import img60 from './Images-JUJU_59.webp';
import img61 from './Images-JUJU_60.webp';
import img62 from './Images-JUJU_61.webp';
import img63 from './Images-JUJU_62.webp';
import img64 from './Images-JUJU_63.webp';
import img65 from './Images-JUJU_64.webp';
import img66 from './Images-JUJU_65.webp';
import img67 from './Images-JUJU_66.webp';
import img68 from './Images-JUJU_67.webp';
import img69 from './Images-JUJU_68.webp';
import img70 from './Images-JUJU_69.webp';
import img71 from './Images-JUJU_70.webp';
import img72 from './Images-JUJU_71.webp';
import img73 from './Images-JUJU_72.webp';
import img74 from './Images-JUJU_73.webp';
import img75 from './Images-JUJU_74.webp';
import img76 from './Images-JUJU_75.webp';
import img77 from './Images-JUJU_76.webp';
import img78 from './Images-JUJU_77.webp';
import img79 from './Images-JUJU_78.webp';

export const tickerImages = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, 
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, 
    img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, 
    img31, img32, img33, img34, img35, img36, img37, img38, img39, img40, 
    img41, img42, img43, img44, img45, img46, img47, img48, img49, img50, 
    img51, img52, img53, img54, img55, img56, img57, img58, img59, img60, 
    img61, img62, img63, img64, img65, img66, img67, img68, img69, img70, 
    img71, img72, img73, img74, img75, img76, img77, img78, img79
];

export const aiFilmsImages = tickerImages.filter((_, i) => i % 2 === 0);
export const commercialsImages = tickerImages.filter((_, i) => i % 2 === 1);
export const storytellersImages = [...tickerImages].reverse().filter((_, i) => i % 3 === 0);
export const ecosystemImages = tickerImages.filter((_, i) => i % 3 === 1);
