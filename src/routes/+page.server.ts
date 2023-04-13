export async function load({ fetch }: any) {
    const result = await fetch("/api/plants");
    return result.json();
}
