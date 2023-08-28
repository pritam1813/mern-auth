import fetch from "node-fetch";

export const createAssessment = async (recaptchaToken, expectedAction) => {
  try {
    const data = {
      event: {
        token: recaptchaToken,
        siteKey: process.env.RECAPTCHA_SITE_KEY,
        expectedAction,
      },
    };
    const result = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.PROJECT_ID}/assessments?key=${process.env.API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );

    const responseData = await result.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
