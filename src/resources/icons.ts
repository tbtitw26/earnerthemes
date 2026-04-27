import {HiOutlineGlobeAlt} from "react-icons/hi";
import {MdOutlineSpeed} from "react-icons/md";
import {RiSimCardLine} from "react-icons/ri";
import {FiShield} from "react-icons/fi";
import {FaCoins} from "react-icons/fa";
import {IoMdPhonePortrait} from "react-icons/io";
import {HiOutlineLogin} from "react-icons/hi";
import {FaWallet} from "react-icons/fa";
import {IoMdMailOpen} from "react-icons/io";
import {FaPhoneVolume} from "react-icons/fa6";
import {BsCurrencyExchange} from "react-icons/bs";
import {IoAccessibilitySharp, IoPricetagsSharp} from "react-icons/io5";
import {GiSettingsKnobs, GiFlexibleStar} from "react-icons/gi";
import {FaLightbulb, FaBrain, FaStore, FaWordpressSimple} from "react-icons/fa";
import {RiUserCommunityLine} from "react-icons/ri";
import {PiChefHatFill, PiPathFill} from "react-icons/pi";
import {MdSubscriptions, MdOutlineDashboardCustomize} from "react-icons/md";
import {FaCalendarTimes} from "react-icons/fa";
import {GoZap} from "react-icons/go";
import {TbLayoutGridAdd} from "react-icons/tb";
import { FaShopify } from "react-icons/fa";

export const ICONS = {
    globe: HiOutlineGlobeAlt,
    speed: MdOutlineSpeed,
    sim: RiSimCardLine,
    shield: FiShield,
    coins: FaCoins,
    phone: IoMdPhonePortrait,
    login: HiOutlineLogin,
    wallet: FaWallet,
    mail: IoMdMailOpen,
    call: FaPhoneVolume,
    pay: BsCurrencyExchange,
    accessibility: IoAccessibilitySharp,
    settings: GiSettingsKnobs,
    bulb: FaLightbulb,
    community: RiUserCommunityLine,
    chef: PiChefHatFill,
    brain: FaBrain,
    path: PiPathFill,
    subscriptions: MdSubscriptions,
    flex: GiFlexibleStar,
    priceTag: IoPricetagsSharp,
    calendar: FaCalendarTimes,
    zap: GoZap,

    store: FaStore,
    wordpress: FaWordpressSimple,
    shopify: FaShopify,
    dashboard: MdOutlineDashboardCustomize,
    layout: TbLayoutGridAdd,
} as const;

export type IconKey = keyof typeof ICONS;