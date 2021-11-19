export default async function doAPIRequest(query) {
  try {
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    if (!response.ok) {
      throw Error('Something went wrong!');
    }

    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
