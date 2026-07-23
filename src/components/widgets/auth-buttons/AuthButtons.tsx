import React from "react";
import {useUser} from "@/context/UserContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import styles from "./AuthButtons.module.scss";
import {FaPlus, FaShoppingCart, FaUser} from "react-icons/fa";
import { useCurrency } from "@/context/CurrencyContext";
import { useTemplateCartStore } from "@/utils/store";

const AuthButtons: React.FC = () => {
    const user = useUser();
    const { sign, currency, convertFromBase } = useCurrency();
    const cartCount = useTemplateCartStore((state) => state.items.length);

    if (user) {
        return (
            <div className={styles.userCompactFlat}>
                <Link href="/cart" className={styles.iconButton} aria-label="Cart">
                    <FaShoppingCart />
                    {cartCount > 0 ? <span className={styles.cartBadge}>{cartCount}</span> : null}
                </Link>

                <Link href="/profile" className={styles.iconButton} aria-label="Profile">
                    <FaUser />
                </Link>

                <Link href="/profile" className={styles.balanceButton}>
                    {sign}{convertFromBase(user.balance ?? 0).toFixed(2)} {currency}
                </Link>

                <Link href="/checkout" className={styles.topUpButton} aria-label="Top up wallet balance">
                    <FaPlus />
                    <span>Top Up</span>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.nonAuthedButtons}>
            <Link href="/sign-in">
                <ButtonUI
                    variant="plain"
                    text="Sign In"
                    shape="default"
                    hoverColor="none"
                    hoverEffect="none"
                    fullWidth
                    textColor="secondary"
                />
            </Link>
            <Link href="/sign-up">
                <ButtonUI
                    text="Sign Up"
                    shape="default"
                    color="primary"
                    hoverEffect="none"
                    fullWidth
                    textColor="quaternary"
                    hoverColor="primary"

                />
            </Link>
        </div>
    );
};

export default AuthButtons;
