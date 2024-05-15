export default function getCustomerId(scopeString: string): string | undefined {
    const match = scopeString.match(/customer_id:([a-f0-9-]+)/);
    return match ? match[1] : undefined;
}
