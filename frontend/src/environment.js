let IS_PROD = false;  // ← Change to false

const server = IS_PROD
    ? "https://gathernet-backend.onrender.com"
    : "http://localhost:8000"  // ← Now uses your local backend

export default server;
