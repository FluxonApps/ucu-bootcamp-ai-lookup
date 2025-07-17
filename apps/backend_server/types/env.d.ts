declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: int;
    API_KEY?: string;
    SCRAPINGDOG_API_KEY?: string;
    OPENAI_API_KEY?: string;
  }
}