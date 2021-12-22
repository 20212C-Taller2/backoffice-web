import { IO } from "./functional"

export const openLink = (url: string): IO<void> =>
  () => window.open(url, "_blank")