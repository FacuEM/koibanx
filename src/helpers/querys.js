import { API } from "./config";

export const queryMaker = (
  searchResult,
  active = null,
  order = null,
  orderBtn = {}
) => {
  const key = searchResult.slice(
    searchResult.indexOf("?") + 1,
    searchResult.indexOf("=")
  );
  const value = searchResult.slice(searchResult.indexOf("=") + 1);

  if (active) {
    if (order) {
      return `${API}?q={"${key}":{"$regex":"${value}"}${',"active":"1"}'}&sort=${order.toLowerCase()}&dir=${
        !orderBtn[order.toLowerCase()] ? 1 : -1
      }`;
    } else {
      return `${API}?q={"${key}":{"$regex":"${value}"}${',"active":"1"}'}`;
    }
  } else {
    if (order) {
      return `${API}?q={"${key}":{"$regex":"${value}"}}&sort=${order.toLowerCase()}&dir=${
        !orderBtn[order.toLowerCase()] ? 1 : -1
      }`;
    } else {
      return `${API}?q={"${key}":{"$regex":"${value}"}}`;
    }
  }
};
