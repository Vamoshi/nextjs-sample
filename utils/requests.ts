const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    // Domain not available
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return [];
  }
}

async function fetchProperty(id: string | string[]) {
  try {
    // Domain not available
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return null;
  }
}

export { fetchProperties, fetchProperty };
