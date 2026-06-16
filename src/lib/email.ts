import { Resend } from "resend";

interface ConfirmationEmailParams {
  to: string;
  fullName: string;
  city: string;
  date: string;
  time: string;
  venue: string;
  language: string;
  pricePence: number;
  ticketQuantity: number;
  guestNames: string[];
}

export async function sendConfirmationEmail(params: ConfirmationEmailParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { to, fullName, city, date, time, venue, language, pricePence, ticketQuantity, guestNames } =
    params;

  const eventDate = new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const eventTime = time.slice(0, 5);
  const price = `£${((pricePence * ticketQuantity) / 100).toFixed(2)}`;
  const firstName = fullName.split(" ")[0];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're in — Mafia Kilty</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F7;font-family:Inter,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background:#0A0A0A;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:-0.5px;">
                Mafia Kilty
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;padding:36px 32px;">
              <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#0A0A0A;">
                You&rsquo;re in, ${firstName}!
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#6E6E73;line-height:1.6;">
                Your spot is confirmed. We can&rsquo;t wait to see you on the night.
              </p>

              <!-- Event details box -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#F5F5F7;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
                <tr>
                  <td>
                    <p style="margin:0 0 14px;font-size:13px;font-weight:600;color:#6E6E73;
                               text-transform:uppercase;letter-spacing:0.5px;">
                      Event Details
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:5px 0;font-size:14px;color:#6E6E73;width:90px;">City</td>
                        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${city}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:14px;color:#6E6E73;">Date</td>
                        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${eventDate}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:14px;color:#6E6E73;">Time</td>
                        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${eventTime}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:14px;color:#6E6E73;">Venue</td>
                        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${venue}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:14px;color:#6E6E73;">Language</td>
                        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">Game in ${language}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:14px;color:#6E6E73;">Tickets</td>
                        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${ticketQuantity} ticket${ticketQuantity > 1 ? "s" : ""}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:14px;color:#6E6E73;">Paid</td>
                        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${price}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${ticketQuantity > 1 ? `
              <!-- Who's coming -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#F5F5F7;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
                <tr>
                  <td>
                    <p style="margin:0 0 14px;font-size:13px;font-weight:600;color:#6E6E73;
                               text-transform:uppercase;letter-spacing:0.5px;">
                      Who&rsquo;s Coming
                    </p>
                    <ul style="margin:0;padding:0;list-style:none;">
                      <li style="padding:4px 0;font-size:14px;font-weight:600;color:#0A0A0A;">
                        ${fullName} <span style="font-weight:400;color:#6E6E73;">(lead booker)</span>
                      </li>
                      ${guestNames.map((name) => `<li style="padding:4px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${name}</li>`).join("")}
                    </ul>
                  </td>
                </tr>
              </table>` : ""}

              <!-- What to expect -->
              <h2 style="margin:0 0 10px;font-size:16px;font-weight:700;color:#0A0A0A;">
                What to expect
              </h2>
              <p style="margin:0 0 28px;font-size:14px;color:#6E6E73;line-height:1.7;">
                When you arrive, our hosts will greet you and walk everyone through the rules.
                No preparation needed &mdash; just show up and have fun. Wear whatever you like.
              </p>

              <!-- Refund note -->
              <p style="margin:0 0 28px;font-size:13px;color:#6E6E73;line-height:1.6;
                         border-left:3px solid #D1D1D6;padding-left:12px;">
                Full refunds are available if you cancel more than 5 days before the event.
                No refunds are available within 5 days of the event.
              </p>

              <!-- Questions -->
              <p style="margin:0;font-size:14px;color:#6E6E73;line-height:1.6;">
                Questions? Reply to this email or contact us at
                <a href="mailto:info@mafiakilty.co.uk"
                   style="color:#0A0A0A;font-weight:600;text-decoration:none;">
                  info@mafiakilty.co.uk
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F5F7;border-radius:0 0 16px 16px;padding:20px 32px;
                        text-align:center;">
              <p style="margin:0;font-size:12px;color:#6E6E73;">
                &copy; ${new Date().getFullYear()} Mafia Kilty &middot;
                <a href="https://mafiakilty.co.uk/terms"
                   style="color:#6E6E73;text-decoration:underline;">Terms &amp; Conditions</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: "Mafia Kilty <info@mafiakilty.co.uk>",
    to,
    subject: `You're in — Mafia Kilty ${city}, ${eventDate}`,
    html,
  });
}

// ============================================================
// Corporate enquiries
// ============================================================

export interface CorporateEnquiryParams {
  name: string;
  company: string;
  workEmail: string;
  role?: string;
  groupSize?: string;
  city?: string;
  format?: string;
  preferredDate?: string;
  budget?: string;
  message?: string;
  /** Human-readable recommendation from the configurator, e.g.
   * "30 people · Off-site · Edinburgh → Two parallel tables of 15 · ~90 min" */
  recommendation?: string;
}

const FROM_ADDRESS = "Mafia Kilty <info@mafiakilty.co.uk>";
const NOTIFY_ADDRESS = "info@mafiakilty.co.uk";

/** Renders an array of [label, value] rows into the shared grey detail box. */
function detailRows(rows: Array<[string, string | undefined]>): string {
  return rows
    .filter(([, value]) => value && value.trim() !== "")
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:5px 0;font-size:14px;color:#6E6E73;width:140px;vertical-align:top;">${label}</td>
        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${escapeHtml(
          value as string
        )}</td>
      </tr>`
    )
    .join("");
}

/** Minimal HTML escaping for user-supplied values placed into email markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Internal notification to the team — full context to prepare a quote. */
export async function sendCorporateEnquiryNotification(
  params: CorporateEnquiryParams
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const rows = detailRows([
    ["Name", params.name],
    ["Company", params.company],
    ["Work email", params.workEmail],
    ["Role", params.role],
    ["Group size", params.groupSize],
    ["City / location", params.city],
    ["Preferred format", params.format],
    ["Preferred date", params.preferredDate],
    ["Budget", params.budget],
  ]);

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>New corporate enquiry</title></head>
<body style="margin:0;padding:0;background:#F5F5F7;font-family:Inter,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F7;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="background:#0A0A0A;border-radius:16px 16px 0 0;padding:28px 32px;">
          <p style="margin:0;font-size:12px;font-weight:600;color:#C9A24B;text-transform:uppercase;letter-spacing:1.5px;">— New corporate enquiry</p>
          <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#FFFFFF;">${escapeHtml(
            params.company
          )}</p>
        </td></tr>
        <tr><td style="background:#FFFFFF;padding:32px;">
          ${
            params.recommendation
              ? `<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;border-radius:12px;padding:18px 22px;margin-bottom:24px;">
                  <tr><td>
                    <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#C9A24B;text-transform:uppercase;letter-spacing:1px;">Their configured event</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#FFFFFF;line-height:1.5;">${escapeHtml(
                      params.recommendation
                    )}</p>
                  </td></tr>
                </table>`
              : ""
          }
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F7;border-radius:12px;padding:20px 24px;">
            <tr><td>
              <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#6E6E73;text-transform:uppercase;letter-spacing:0.5px;">Enquiry details</p>
              <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
            </td></tr>
          </table>
          ${
            params.message
              ? `<p style="margin:24px 0 8px;font-size:13px;font-weight:600;color:#6E6E73;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                 <p style="margin:0;font-size:14px;color:#0A0A0A;line-height:1.7;white-space:pre-wrap;">${escapeHtml(
                   params.message
                 )}</p>`
              : ""
          }
          <p style="margin:28px 0 0;font-size:14px;color:#6E6E73;">
            Reply directly to <a href="mailto:${escapeHtml(
              params.workEmail
            )}" style="color:#0A0A0A;font-weight:600;text-decoration:none;">${escapeHtml(
    params.workEmail
  )}</a>.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_ADDRESS,
    replyTo: params.workEmail,
    subject: `Corporate enquiry — ${params.company}`,
    html,
  });
}

/** Auto-reply to the enquirer. No prices. Confirms we'll be in touch. */
export async function sendCorporateEnquiryAutoReply(
  params: CorporateEnquiryParams
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const firstName = params.name.split(" ")[0];

  const rows = detailRows([
    ["Group size", params.groupSize],
    ["City / location", params.city],
    ["Preferred format", params.format],
    ["Preferred date", params.preferredDate],
  ]);

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Thanks for your enquiry — Mafia Kilty</title></head>
<body style="margin:0;padding:0;background:#F5F5F7;font-family:Inter,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F7;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="background:#0A0A0A;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
          <p style="margin:0;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:-0.5px;">Mafia Kilty</p>
          <p style="margin:8px 0 0;font-size:11px;font-weight:600;color:#C9A24B;text-transform:uppercase;letter-spacing:2px;">Corporate</p>
        </td></tr>
        <tr><td style="background:#FFFFFF;padding:36px 32px;">
          <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0A0A0A;">Thanks, ${escapeHtml(
            firstName
          )} — we're on it.</h1>
          <p style="margin:0 0 28px;font-size:15px;color:#6E6E73;line-height:1.6;">
            Your enquiry has landed. We'll come back to you within one working day with available dates and a firm quote tailored to your team.
          </p>
          ${
            rows
              ? `<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F7;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
                  <tr><td>
                    <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#6E6E73;text-transform:uppercase;letter-spacing:0.5px;">What you told us</p>
                    <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
                  </td></tr>
                </table>`
              : ""
          }
          <p style="margin:0;font-size:14px;color:#6E6E73;line-height:1.6;">
            Got something to add in the meantime? Just reply to this email or reach us at
            <a href="mailto:info@mafiakilty.co.uk" style="color:#0A0A0A;font-weight:600;text-decoration:none;">info@mafiakilty.co.uk</a>.
          </p>
        </td></tr>
        <tr><td style="background:#F5F5F7;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#6E6E73;">&copy; ${new Date().getFullYear()} Mafia Kilty &middot; Live, screen-free social deduction for teams</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: params.workEmail,
    subject: "Thanks for your enquiry — Mafia Kilty",
    html,
  });
}
