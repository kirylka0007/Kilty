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
}

export async function sendConfirmationEmail(params: ConfirmationEmailParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { to, fullName, city, date, time, venue, language, pricePence } =
    params;

  const eventDate = new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const eventTime = time.slice(0, 5);
  const price = `£${(pricePence / 100).toFixed(2)}`;
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
                        <td style="padding:5px 0;font-size:14px;color:#6E6E73;">Paid</td>
                        <td style="padding:5px 0;font-size:14px;font-weight:600;color:#0A0A0A;">${price}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What to expect -->
              <h2 style="margin:0 0 10px;font-size:16px;font-weight:700;color:#0A0A0A;">
                What to expect
              </h2>
              <p style="margin:0 0 28px;font-size:14px;color:#6E6E73;line-height:1.7;">
                When you arrive, our hosts will greet you and walk everyone through the rules.
                No preparation needed &mdash; just show up and have fun. Wear whatever you like
                and feel free to bring friends.
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
