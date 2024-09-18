export async function fetchWithRetries(url, retries, baseDelay = 1000) {
    const nonRetryableStatuses = [401, 403, 404];
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(url);
        if (response.ok) return response;
        
        if (nonRetryableStatuses.includes(response.status) || i === retries) {
          return response;
        }
      } catch (error) {
        if (i === retries) throw error;
        console.error(`Fetch attempt ${i + 1} failed with error:`, error.message);
      }
      
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    throw new Error(`Failed to fetch after ${retries} retries`);
}

// module.exports = { fetchWithRetries };