export default async function doAPIRequest(url, method, headers, body) {
    try {
        const response = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          throw Error('Something went wrong!');
        }
  
        const data = await response.json();
        return [data, null];
  
      } catch (error) {
        return [null, error];
      }
};