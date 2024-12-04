const API_URL = process.env.API_URL;
if (typeof API_URL !== "string" || API_URL.length < 1) {
    const varName = Object.keys({ API_URL })[0];
    throw new Error(`Insufficient environment variables, missing ${varName}`);
}
export { API_URL };
