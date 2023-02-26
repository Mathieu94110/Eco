import type { FakeAdInterface } from "@/shared/interfaces";

const dummyRequest = async <TResponse>(url: string): Promise<TResponse> => {
    const response = await fetch(url);
    const JSONresponse = await response.json();
    return JSONresponse.products;
  };

  const dummyApi = {
    get: <TResponse>(url: string) => dummyRequest<TResponse>(url),
  };

  
export const getFakeAds = async (): Promise<FakeAdInterface[]> => await dummyApi.get("https://dummyjson.com/products?limit=50");