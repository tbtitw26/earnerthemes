import { sendEmail } from "@/backend/utils/sendEmail";
import { ENV } from "@/backend/config/env";
import { formatMoney } from "@/utils/money";

import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_PHONE,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

export const emailService = {
    async sendWelcomeEmail(data: {
        email: string;
        firstName: string;
    }) {
        const companyName = COMPANY_NAME || "Website";
        const appUrl = ENV.APP_URL || "http://localhost:3000";

        const subject = `Welcome to ${companyName} 🎉`;

        const text = `
Hi ${data.firstName},

Thank you for registering at ${companyName}.
Your account has been successfully created.

You can now sign in and start using the platform.

${COMPANY_EMAIL ? `Support email: ${COMPANY_EMAIL}` : ""}
${COMPANY_PHONE ? `Phone: ${COMPANY_PHONE}` : ""}
${COMPANY_ADDRESS ? `Address: ${COMPANY_ADDRESS}` : ""}

Best regards,
${companyName} Team
        `.trim();

        const html = `
        <div style="font-family: Arial, sans-serif; background:#f4faff; padding:20px; color:#333;">
          <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            
            <h2 style="color:#007BFF; text-align:center; margin-bottom:24px;">
              Welcome to ${escapeHtml(companyName)} 🎉
            </h2>

            <p style="font-size:16px; line-height:1.6;">
              Hi <strong>${escapeHtml(data.firstName)}</strong>,
            </p>

            <p style="font-size:16px; line-height:1.6;">
              Thank you for registering at <strong>${escapeHtml(companyName)}</strong>.
              Your account has been successfully created.
            </p>

            <p style="font-size:16px; line-height:1.6;">
              You can now sign in and start using the platform.
            </p>

            <div style="text-align:center; margin:30px 0;">
              <a
                href="${escapeHtml(appUrl)}"
                style="background:#007BFF; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold; display:inline-block;"
              >
                Open ${escapeHtml(companyName)}
              </a>
            </div>

            ${
            COMPANY_EMAIL || COMPANY_PHONE || COMPANY_ADDRESS
                ? `
            <div style="margin-top:24px; padding:16px; background:#f8fbff; border-radius:8px;">
              <p style="margin:0 0 10px; font-size:14px; font-weight:bold;">
                Contact details
              </p>

              ${
                    COMPANY_EMAIL
                        ? `<p style="margin:4px 0; font-size:14px;">Email: ${escapeHtml(COMPANY_EMAIL)}</p>`
                        : ""
                }

              ${
                    COMPANY_PHONE
                        ? `<p style="margin:4px 0; font-size:14px;">Phone: ${escapeHtml(COMPANY_PHONE)}</p>`
                        : ""
                }

              ${
                    COMPANY_ADDRESS
                        ? `<p style="margin:4px 0; font-size:14px;">Address: ${escapeHtml(COMPANY_ADDRESS)}</p>`
                        : ""
                }
            </div>
            `
                : ""
        }

            <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

            <p style="font-size:14px; color:#777; text-align:center; margin:0 0 8px;">
              © ${new Date().getFullYear()} ${escapeHtml(companyName)} – All rights reserved.
            </p>

            ${
            COMPANY_LEGAL_NAME || COMPANY_NUMBER
                ? `
            <p style="font-size:13px; color:#999; text-align:center; margin:0;">
              ${COMPANY_LEGAL_NAME ? escapeHtml(COMPANY_LEGAL_NAME) : ""}
              ${
                    COMPANY_LEGAL_NAME && COMPANY_NUMBER
                        ? " · "
                        : ""
                }
              ${
                    COMPANY_NUMBER
                        ? `Company No. ${escapeHtml(COMPANY_NUMBER)}`
                        : ""
                }
            </p>
            `
                : ""
        }

          </div>
        </div>
        `;

        return await sendEmail(data.email, subject, text, html);
    },

    async sendOrderConfirmationEmail(data: {
        email: string;
        firstName?: string;
        subject: string;
        summaryTitle?: string;
        summaryLines: string[];
        amountLabel: string;
        amountValue: string;
        transactionDate: Date | string;
    }) {
        const companyName = COMPANY_NAME || "Website";
        const customerName = data.firstName?.trim() || "there";
        const formattedDate = new Date(data.transactionDate).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        const text = `
Hi ${customerName},

Your transaction with ${companyName} was completed successfully.

${data.summaryLines.join("\n")}
${data.amountLabel}: ${data.amountValue}
Transaction date: ${formattedDate}

${COMPANY_EMAIL ? `Support email: ${COMPANY_EMAIL}` : ""}
${COMPANY_PHONE ? `Phone: ${COMPANY_PHONE}` : ""}

Best regards,
${companyName} Team
        `.trim();

        const html = `
        <div style="font-family: Arial, sans-serif; background:#f4faff; padding:20px; color:#333;">
          <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            <h2 style="color:#007BFF; text-align:center; margin-bottom:24px;">
              ${escapeHtml(data.subject)}
            </h2>

            <p style="font-size:16px; line-height:1.6;">
              Hi <strong>${escapeHtml(customerName)}</strong>,
            </p>

            <p style="font-size:16px; line-height:1.6;">
              Your transaction with <strong>${escapeHtml(companyName)}</strong> was completed successfully.
            </p>

            <div style="margin:24px 0; padding:18px; background:#f8fbff; border-radius:8px;">
              <p style="margin:0 0 12px; font-size:15px; font-weight:700;">
                ${escapeHtml(data.summaryTitle || "Order summary")}
              </p>
              <ul style="margin:0; padding-left:18px;">
                ${data.summaryLines
                    .map(
                        (line) =>
                            `<li style="margin:0 0 8px; font-size:14px; line-height:1.5;">${escapeHtml(line)}</li>`
                    )
                    .join("")}
              </ul>
            </div>

            <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
              <tbody>
                <tr>
                  <td style="padding:8px 0; font-size:14px; color:#666;">${escapeHtml(data.amountLabel)}</td>
                  <td style="padding:8px 0; font-size:14px; text-align:right; font-weight:700;">${escapeHtml(data.amountValue)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; font-size:14px; color:#666;">Transaction date</td>
                  <td style="padding:8px 0; font-size:14px; text-align:right;">${escapeHtml(formattedDate)}</td>
                </tr>
              </tbody>
            </table>

            ${
                COMPANY_EMAIL || COMPANY_PHONE || COMPANY_ADDRESS
                    ? `
            <div style="margin-top:24px; padding:16px; background:#f8fbff; border-radius:8px;">
              <p style="margin:0 0 10px; font-size:14px; font-weight:bold;">Support</p>
              ${COMPANY_EMAIL ? `<p style="margin:4px 0; font-size:14px;">Email: ${escapeHtml(COMPANY_EMAIL)}</p>` : ""}
              ${COMPANY_PHONE ? `<p style="margin:4px 0; font-size:14px;">Phone: ${escapeHtml(COMPANY_PHONE)}</p>` : ""}
              ${COMPANY_ADDRESS ? `<p style="margin:4px 0; font-size:14px;">Address: ${escapeHtml(COMPANY_ADDRESS)}</p>` : ""}
            </div>
            `
                    : ""
            }

            <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />
            <p style="font-size:14px; color:#777; text-align:center; margin:0 0 8px;">
              © ${new Date().getFullYear()} ${escapeHtml(companyName)} – All rights reserved.
            </p>
            ${
                COMPANY_LEGAL_NAME || COMPANY_NUMBER
                    ? `
            <p style="font-size:13px; color:#999; text-align:center; margin:0;">
              ${COMPANY_LEGAL_NAME ? escapeHtml(COMPANY_LEGAL_NAME) : ""}
              ${COMPANY_LEGAL_NAME && COMPANY_NUMBER ? " · " : ""}
              ${COMPANY_NUMBER ? `Company No. ${escapeHtml(COMPANY_NUMBER)}` : ""}
            </p>
            `
                    : ""
            }
          </div>
        </div>
        `;

        return await sendEmail(data.email, data.subject, text, html);
    },

    async sendTemplatePurchaseConfirmationEmail(data: {
        email: string;
        firstName?: string;
        purchases: Array<{
            templateTitle: string;
            platform?: string;
            category?: string;
        }>;
        amountPaid: number;
        purchaseSource: "direct" | "cart";
        transactionDate: Date | string;
    }) {
        const isMultiple = data.purchases.length > 1;
        const subject = isMultiple
            ? "Template purchase confirmation"
            : "Template purchase confirmed";

        const summaryLines = [
            `Purchase type: ${data.purchaseSource === "cart" ? "Cart checkout" : "Direct purchase"}`,
            ...data.purchases.map((purchase, index) => {
                const meta = [purchase.platform, purchase.category].filter(Boolean).join(" · ");
                return `${isMultiple ? `Template ${index + 1}` : "Template"}: ${purchase.templateTitle}${meta ? ` (${meta})` : ""}`;
            }),
            "Access: Your purchased templates will be available from your account/dashboard area.",
        ];

        return await this.sendOrderConfirmationEmail({
            email: data.email,
            firstName: data.firstName,
            subject,
            summaryTitle: isMultiple ? "Purchased templates" : "Purchased template",
            summaryLines,
            amountLabel: "Amount paid",
            amountValue: formatMoney(data.amountPaid),
            transactionDate: data.transactionDate,
        });
    },
};

function escapeHtml(value: string) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
